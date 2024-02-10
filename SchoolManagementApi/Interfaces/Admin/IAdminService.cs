using SchoolManagementApi.DTOs;

namespace SchoolManagementApi.Intefaces.Admin
{
  public interface IAdminService
  {
    Task<List<UserWithRoles>> GetAllUsersWithRoles();
    Task<UserWithRoles> GetUserByUniqueId(string uniqueId);
  }
}