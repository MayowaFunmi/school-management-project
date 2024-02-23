using System.ComponentModel.DataAnnotations;

namespace SchoolManagementApi.Models
{
  public class Subject
  {
    [Key]
    public Guid SubjectId { get; set; }
    public string SubjectName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }
  }
}