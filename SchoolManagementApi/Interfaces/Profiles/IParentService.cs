using SchoolManagementApi.Models.UserModels;

namespace SchoolManagementApi.Intefaces.Profiles
{
  public interface IParentService
  {
    Task<Parent> AddParentProfile(Parent parent);
    Task<bool> ParentProfileExists(string userId);
    Task<Parent> GetParentById(string parentId);
    Task<Parent> GetParentByUniqueId(string parentUniqueId);
    Task<Parent> GetStudentParent(string studentId);
    Task<List<Parent>> GetParentInSchool(string schoolId);
  }
}