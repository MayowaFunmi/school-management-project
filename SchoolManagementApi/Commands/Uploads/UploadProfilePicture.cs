using System.Net;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SchoolManagementApi.Data;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Profiles;
using SchoolManagementApi.Intefaces.Uploads;

namespace SchoolManagementApi.Commands.Uploads
{
  public class UploadProfilePicture
  {
    public class UploadProfilePictureCommand : IRequest<GenericResponse>
    {
      public required string StaffId { get; set; }
      public required IFormFile ProfilePicture { get; set; }
    }

    public class UploadProfilePictureHandler(ApplicationDbContext context, IFileService fileService, ITeachingStaffInterface teachingStaffInterface) : IRequestHandler<UploadProfilePictureCommand, GenericResponse>
    {
      private readonly ApplicationDbContext _context = context;
      private readonly IFileService _fileService = fileService;
      private readonly ITeachingStaffInterface _teachingStaffInterface = teachingStaffInterface;

      public async Task<GenericResponse> Handle(UploadProfilePictureCommand request, CancellationToken cancellationToken)
      {
        try
        {
          // check if user profile exist
          var checkTeacherProfile = await _teachingStaffInterface.TeachingStaffExists(request.StaffId);
          if (!checkTeacherProfile)
          {
            return new GenericResponse
            {
              Status = HttpStatusCode.Forbidden.ToString(),
              Message = $"Teacher with id {request.StaffId} does not have a profile yet"
            };
          }
          else
          {
            var staff = await _context.TeachingStaffs
              .Where(t => t.UserId == request.StaffId)
              //.Select(t => t.ProfilePicture)
              .FirstOrDefaultAsync(cancellationToken);

            var user = _context.Users.FirstOrDefault(u => u.Id == request.StaffId);          
            if (user != null && staff != null)
            {
              if (!string.IsNullOrEmpty(staff.ProfilePicture))
              {
                return new GenericResponse
                {
                  Status = HttpStatusCode.BadRequest.ToString(),
                  Message = $"Teacher with id {request.StaffId} already has a profile picture uploaded"
                };
              }
              else
              {
                var profilePictureUrl = await _fileService.ProcessFiles(request.ProfilePicture);
                if (!string.IsNullOrEmpty(profilePictureUrl))
                {
                  staff.ProfilePicture = profilePictureUrl;
                  user.PercentageCompleted += 10;
                  await _context.SaveChangesAsync(cancellationToken);
                  return new GenericResponse
                  {
                    Status = HttpStatusCode.OK.ToString(),
                    Message = "Teacher profile picture uploaded successfully",
                  };
                }
                return new GenericResponse
                {
                  Status = HttpStatusCode.OK.ToString(),
                  Message = "Failed to upload profile picture",
                };
              }
            }

            return new GenericResponse
            {
              Status = HttpStatusCode.BadRequest.ToString(),
              Message = "User or Teacher not found",
            };
          }
        }
        catch (Exception ex)
        {
          return new GenericResponse
          {
            Status = HttpStatusCode.InternalServerError.ToString(),
            Message = $"An internal server error occurred - {ex.Message}",
          };
        }
      }
    }
  }
}