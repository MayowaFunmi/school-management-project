using Microsoft.AspNetCore.Identity;

namespace SchoolManagementApi.Intefaces.Roles
{
  public interface IRoleService
  {
    Task<bool> AddRole(string roleName);
    Task<bool> EditRole(string roleName, string editedRole);
    Task<bool> DeleteRole(string roleName);
    List<IdentityRole> GetRoleList();
    List<IdentityRole> GetSelectedRoleList();
  }
}
