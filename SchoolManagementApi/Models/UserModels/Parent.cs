using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static SchoolManagementApi.Constants.RoleCionstants;

namespace SchoolManagementApi.Models.UserModels
{
  public class Parent
  {
    [Key]
    public Guid ParentId { get; set; }
    [ForeignKey("UserId")]
    public string UserId { get; set; }
    public virtual ApplicationUser User { get; set; }
    public string OrganizationUniqueId { get; set; }
    [ForeignKey("StudentSchoolId")]
    public Guid StudentSchoolId { get; set; }
    public virtual School StudentSchool { get; set; }
    public string? Title { get; set; }
    public string? ProfilePicture { get; set; }
    public string Gender { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
    public string RelationshipType { get; set; }
    public string Address { get; set; }
    public string Religion { get; set; }
    public string MaritalStatus { get; set; }
    public string StateOfOrigin { get; set; }
    public string LgaOfOrigin { get; set; }
    public string LgaOfResidence { get; set; }
    public string Occupation { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }
  }
}