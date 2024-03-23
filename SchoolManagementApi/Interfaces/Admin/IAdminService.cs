using SchoolManagementApi.DTOs;
using SchoolManagementApi.Models;

namespace SchoolManagementApi.Intefaces.Admin
{
  public interface IAdminService
  {
    Task<List<UserWithRoles>> GetAllUsersWithRoles();
    Task<UserWithRoles> GetUserByUniqueId(string uniqueId);
    Task<List<Subject>> GetSubjectsInSchool();
  }
}