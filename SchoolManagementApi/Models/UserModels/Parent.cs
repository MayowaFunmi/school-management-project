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
    public TitleEnum? Title { get; set; } = TitleEnum.Mr;
    public string ProfilePicture { get; set; }
    public string Address { get; set; }
    public ReligionEnum Religion { get; set; } = ReligionEnum.Christianity;
    public MaritalStatus MaritalStatus { get; set; } = MaritalStatus.Single;
    public string StateOfOrigin { get; set; }
    public string LgaOfOrigin { get; set; }
    public string LgaOfResidence { get; set; }
    public string Occupation { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }
  }
}