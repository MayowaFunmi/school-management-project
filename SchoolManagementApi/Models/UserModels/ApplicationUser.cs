using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace SchoolManagementApi.Models.UserModels
{
  public class ApplicationUser : IdentityUser
  {
    public string? OrganizationId { get; set; }
    public string UniqueId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int PercentageCompleted { get; set; }
    //public Organization Organization { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }
  }
}