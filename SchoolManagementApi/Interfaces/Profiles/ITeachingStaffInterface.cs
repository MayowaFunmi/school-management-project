using SchoolManagementApi.Models.UserModels;

namespace SchoolManagementApi.Intefaces.Profiles
{
  public interface ITeachingStaffInterface
  {
    Task<TeachingStaff> AddTeachingStaff(TeachingStaff teachingStaff);
    Task<TeachingStaff> GetTeacherById(string userId);
    Task<TeachingStaff> GetTeacherByUniqueId(string uniqueId);
    Task<bool> TeachingStaffExists(string userId);
  }
}