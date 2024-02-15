using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagementApi.Models
{
  public class School
  {
    [Key]
    public Guid SchoolId { get; set; }
    public string OrganizationUniqueId { get; set; }
    public string SchoolUniqueId { get; set; }

    [ForeignKey("ZoneId")]
    [Required]
    public Guid ZoneId { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public List<Department> Departments { get;set; }
    public List<StudentClass> StudentClasses { get;set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }
  }
}