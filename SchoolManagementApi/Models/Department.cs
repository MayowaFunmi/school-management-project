using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagementApi.Models
{
  public class Department
  {
    public Guid DepartmentId { get; set; }

    [ForeignKey("SchoolId")]
    public Guid SchoolId { get; set; }
    public string Name { get; set; }
    public School School { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }
  }
}