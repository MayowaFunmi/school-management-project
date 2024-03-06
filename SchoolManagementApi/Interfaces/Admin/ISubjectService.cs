using SchoolManagementApi.Models;

namespace SchoolManagementApi.Intefaces.Admin
{
  public interface ISubjectService
  {
    Task<Subject> AddSubject(Subject subject);
    Task<List<Subject>> GetSubjectsInSchool(string SchoolId);
  }
}