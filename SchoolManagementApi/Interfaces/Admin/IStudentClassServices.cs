using SchoolManagementApi.Models;

namespace SchoolManagementApi.Intefaces.Admin
{
  public interface IStudentClassServices
  {
    Task<StudentClass> AddStudentClass(StudentClass studentClass);
    Task<bool> GenerateClassArms(StudentClass studentClass);
    Task<List<StudentClass>> GetAllClasses(string schoolId);
    Task<List<ClassArms>> GetAllClassArms(string schoolId, string classId);
    // add class arms later
  }
}