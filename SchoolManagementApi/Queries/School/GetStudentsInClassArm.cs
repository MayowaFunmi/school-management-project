using System.Net;
using MediatR;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Admin;
using SchoolManagementApi.Intefaces.LoggerManager;
using WatchDog;

namespace SchoolManagementApi.Queries.School
{
  public class GetStudentsInClassArm
  {
    public record GetStudentsInClassArmQuery(string studentClassId) : IRequest<GenericResponse>;

    public class GetStudentsInClassArmHandler(IStudentClassServices studentClassServices, ILoggerManager logger) : IRequestHandler<GetStudentsInClassArmQuery, GenericResponse>
    {
      private readonly IStudentClassServices _studentClassServices = studentClassServices;
      private readonly ILoggerManager _logger = logger;

      public async Task<GenericResponse> Handle(GetStudentsInClassArmQuery request, CancellationToken cancellationToken)
      {
        try
        {
          var students = await _studentClassServices.StudentsByClassArm(request.studentClassId);
          if (students.Count != 0)
          {
            return new GenericResponse
            {
              Status = HttpStatusCode.OK.ToString(),
              Message = $"{students.Count} students in class retrieved successfully",
              Data = students
            };
          }
          return new GenericResponse
          {
            Status = HttpStatusCode.OK.ToString(),
            Message = "no students found in this class",
            Data = students
          };
        }
        catch (Exception ex)
        {
          _logger.LogError($"Error getting students in the same class arm - {ex.Message}");
          WatchLogger.LogError(ex.ToString(), $"Error getting students in the same class arm - {ex.Message}");
          return new GenericResponse
          {
            Status = HttpStatusCode.InternalServerError.ToString(),
            Message = $"Error getting school- {ex.Message}",
          };
        }
      }
    }
  }
}