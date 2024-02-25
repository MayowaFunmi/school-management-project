using System.Net;
using MediatR;
using SchoolManagementApi.Data;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Profiles;
using SchoolManagementApi.Models.UserModels;
using static SchoolManagementApi.Constants.DictionaryMaps;

namespace SchoolManagementApi.Commands.Profiles
{
  public class AddNonTeachingStaff
  {
    public class AddNonTeachingStaffCommand : IRequest<GenericResponse>
    {
      public required string UserId { get; set; }
      public string? Title { get; set; }
      public string? MiddleName { get; set; }
      public string? ProfilePicture { get; set; }
      public required string Gender { get; set; }
      public required DateTime DateOfBirth { get; set; }
      public required int Age { get; set; }
      public required string StateOfOrigin { get; set; }
      public required string LgaOfOrigin { get; set; }
      public required string Address { get; set; }
      public required string Religion { get; set; }
      public string? MaritalStatus { get; set; }
      public required string AboutMe { get; set; }
      public required string Designation { get; set; }
      public required int GradeLevel { get; set; }
      public required DateTime FirstAppointment { get; set; }
      public required int YearsInService { get; set; }
      public required string Qualification { get; set; }
      public required string Discipline { get; set; }
      public required string CurrentPostingZoneId { get; set; }
      public required string CurrentPostingSchoolId { get; set; }
      public required string PreviousPosting1Id { get; set; }
      public required string PreviousPosting2Id { get; set; }
      public required string PreviousPosting3Id { get; set; }
      public bool HasUploads { get; set; } = false;
    }

    public class AddNonTeachingStaffHandler(INonTeachingStaffInterface nonTeachingStaffInterface, ApplicationDbContext context) : IRequestHandler<AddNonTeachingStaffCommand, GenericResponse>
    {
      private readonly INonTeachingStaffInterface _nonTeachingStaffInterface = nonTeachingStaffInterface;
      private readonly ApplicationDbContext _context = context;

      public async Task<GenericResponse> Handle(AddNonTeachingStaffCommand request, CancellationToken cancellationToken)
      {
        try
        {
          var checkStaffExists = await _nonTeachingStaffInterface.NonTeachingStaffExists(request.UserId);
          if (checkStaffExists)
          {
            return new GenericResponse
            {
              Status = HttpStatusCode.Forbidden.ToString(),
              Message = $"Profile already exists for staff with id {request.UserId}"
            };
          }

          var staff = new NonTeachingStaff
          {
            UserId = request.UserId,
            Title = TitleMap.TitleDictionary.TryGetValue(request.Title!, out string? value) ? value : "Mr",
            MiddleName = request.MiddleName!,
            ProfilePicture = request.ProfilePicture!,
            Gender = TitleMap.GenderDictionary.TryGetValue(request.Gender!, out string? GenderValue) ? GenderValue : "Male",
            DateOfBirth = request.DateOfBirth,
            Age = request.Age,
            StateOfOrigin = request.StateOfOrigin,
            LgaOfOrigin = request.LgaOfOrigin,
            Address = request.Address,
            Religion = TitleMap.ReligionDictionary.TryGetValue(request.Religion!, out string? ReligionValue) ? ReligionValue : "Christianity",
            MaritalStatus = TitleMap.MaritalDictionary.TryGetValue(request.MaritalStatus!, out string? MaritalValue) ? MaritalValue : "Married",
            AboutMe = request.AboutMe,
            Designation = TitleMap.DesignationDictionary.TryGetValue(request.Designation!, out string? DesignationValue) ? DesignationValue : "ClassTeacher",
            GradeLevel = request.GradeLevel,
            FirstAppointment = request.FirstAppointment,
            YearsInService = request.YearsInService,
            Qualification = TitleMap.QualificationDictionary.TryGetValue(request.Qualification!, out string? QualificationValue) ? QualificationValue : "BEd",
            Discipline = request.Discipline,
            CurrentPostingSchoolId = Guid.Parse(request.CurrentPostingSchoolId),
            PreviousPosting1Id = Guid.Parse(request.PreviousPosting1Id),
            PreviousPosting2Id = Guid.Parse(request.PreviousPosting2Id),
            PreviousPosting3Id = Guid.Parse(request.PreviousPosting3Id),
          };
          var createdSyaff = await _nonTeachingStaffInterface.AddNonTeachingStaff(staff);
          if (createdSyaff != null)
          {
            var user = _context.Users.FirstOrDefault(u => u.Id == request.UserId);
            if (user != null)
            {
              user.PercentageCompleted = 70;
              await _context.SaveChangesAsync(cancellationToken);
            }
            
            return new GenericResponse
            {
              Status = HttpStatusCode.OK.ToString(),
              Message = "Non Teaching Staff profile created sucessfully",
              Data = createdSyaff
            };
          }
          return new GenericResponse
          {
            Status = HttpStatusCode.BadRequest.ToString(),
            Message = "Failed to add staff profile",
          };
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