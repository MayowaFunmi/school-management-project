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
    public string? Title { get; set; }
    public string ProfilePicture { get; set; }
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