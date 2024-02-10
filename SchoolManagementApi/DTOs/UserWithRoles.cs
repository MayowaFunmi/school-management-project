using Microsoft.AspNetCore.Identity;
using SchoolManagementApi.Models.UserModels;

namespace SchoolManagementApi.DTOs
{
  public class UserWithRoles
  {
    public ApplicationUser User { get; set; }
    public List<IdentityRole> UserRoles { get; set; }
  }
}