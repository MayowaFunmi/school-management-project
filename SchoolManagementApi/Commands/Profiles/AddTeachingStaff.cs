using System.Net;
using MediatR;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Profiles;
using SchoolManagementApi.Models.UserModels;
using static SchoolManagementApi.Constants.DictionaryMaps;

namespace SchoolManagementApi.Commands.Profiles
{
  public class AddTeachingStaff
  {
    public class AddTeachingStaffCommand : IRequest<GenericResponse>
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
      public string? PublishedWork { get; set; }
      public required string CurrentSubjectId { get; set; }
      public List<string> OtherSubjects { get; set; } = [];
    }

    public class AddTeachingStaffHandler(ITeachingStaffInterface teachingStaffInterface) : IRequestHandler<AddTeachingStaffCommand, GenericResponse>
    {
      private readonly ITeachingStaffInterface _teachingStaffInterface = teachingStaffInterface;

      public async Task<GenericResponse> Handle(AddTeachingStaffCommand request, CancellationToken cancellationToken)
      {
        try
        {
          var checkTeacherProfile = await _teachingStaffInterface.TeachingStaffExists(request.UserId);
          if (checkTeacherProfile)
          {
            return new GenericResponse
            {
              Status = HttpStatusCode.Forbidden.ToString(),
              Message = $"Profile already exists for Teacher with id {request.UserId}"
            };
          }
          var teacher = new TeachingStaff
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
            
          };
          var createdTeacher = await _teachingStaffInterface.AddTeachingStaff(teacher);
          if (createdTeacher != null)
          {
            return new GenericResponse
            {
              Status = HttpStatusCode.OK.ToString(),
              Message = "Teacher profile created sucessfully",
              Data = createdTeacher
            };
          }
          return new GenericResponse
          {
            Status = HttpStatusCode.BadRequest.ToString(),
            Message = "Failed to add teacher profile",
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