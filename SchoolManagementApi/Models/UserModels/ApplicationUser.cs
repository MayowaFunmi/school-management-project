using Microsoft.AspNetCore.Identity;

namespace SchoolManagementApi.Models.UserModels
{
  public class ApplicationUser : IdentityUser
  {
    public string UniqueId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public ICollection<IdentityRole> Roles { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }
  }
}