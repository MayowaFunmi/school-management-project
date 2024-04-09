using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SchoolManagementApi.Models.UserModels;

namespace SchoolManagementApi.Models
{
  public class Zone
  {
    [Key]
    public Guid ZoneId { get; set; }
    public string AdminId { get; set; }

    [ForeignKey("OrganizationId")]
    [Required]
    public Guid OrganizationId { get; set; }
    public string Name { get; set; }
    public List<School> Schools { get; set; }
    public string? State { get; set; }
    public List<string>? LocalGovtAreas { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }
  }
}