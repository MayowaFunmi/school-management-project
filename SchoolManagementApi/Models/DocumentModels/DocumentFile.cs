using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SchoolManagementApi.Models.UserModels;

namespace SchoolManagementApi.Models.DocumentModels
{
  public class DocumentFile
  {
    [Key]
    public Guid DocumenetId { get; set; }
    public string FileName { get; set; }
    public string FileContent { get; set; }

    [ForeignKey("UserId")]
    public string UserId { get; set; }
    public virtual ApplicationUser User { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }
  }
}