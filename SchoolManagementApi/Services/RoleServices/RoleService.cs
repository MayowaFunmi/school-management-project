using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SchoolManagementApi.Data;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Roles;
using SchoolManagementApi.Models.UserModels;

namespace SchoolManagementApi.Services.RoleServices
{
  public class RoleService(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, ApplicationDbContext context) : IRoleService
  {
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly ApplicationDbContext _context = context;

    public async Task<bool> AddRole(string roleName)
    {
      var role = new IdentityRole(roleName);
      var result = await _roleManager.CreateAsync(role);
      return result.Succeeded;
    }

    public async Task<bool> DeleteRole(string roleName)
    {
      var role = await _roleManager.FindByNameAsync(roleName);
      if (role != null)
      {
          var result = await _roleManager.DeleteAsync(role);
          return result.Succeeded;
      }
      return false;
    }

    public async Task<bool> EditRole(string roleName, string editedRole)
    {
      var role = await _roleManager.FindByNameAsync(roleName);
      if (role != null)
      {
        role.Name = editedRole; // Update the role's name
        var result = await _roleManager.UpdateAsync(role);
        return result.Succeeded;
      }
      return false;
    }

    public List<IdentityRole> GetRoleList()
    {
      List<IdentityRole> roles = [];
      foreach (var role in _roleManager.Roles)
      {
          roles.Add(role);
      }
      return roles;
    }
  }
}