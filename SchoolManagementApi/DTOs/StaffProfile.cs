using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SchoolManagementApi.Models;
using SchoolManagementApi.Models.DocumentModels;
using SchoolManagementApi.Models.UserModels;
namespace SchoolManagementApi.DTOs
{
  public class StaffProfile
  {
    [Key]
    public Guid StaffProfileId { get; set; }
    [ForeignKey("UserId")]
    public string UserId { get; set; }
    public virtual ApplicationUser User { get; set; }
    public string? Title { get; set; }
    public string MiddleName { get; set; }
    public string? ProfilePicture { get; set; }
    public string Gender { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
    public string StateOfOrigin { get; set; }
    public string LgaOfOrigin { get; set; }
    public string Address { get; set; }
    public string Religion { get; set; }
    public string MaritalStatus { get; set; }
    public string AboutMe { get; set; }
    public string Designation { get; set; }
    public int GradeLevel { get; set; }
    public DateTime? FirstAppointment { get; set; }
    public int YearsInService { get; set; }
    public string? Qualification { get; set; }
    public string Discipline { get; set; }

    [ForeignKey("CurrentPostingZoneId")]
    public Guid CurrentPostingZoneId { get; set; }
    public virtual Zone CurrentPostingZone { get; set; }

    [ForeignKey("CurrentPostingSchoolId")]
    public Guid? CurrentPostingSchoolId { get; set; }
    public virtual School? CurrentPostingSchool { get; set; }
    public virtual List<string>? PreviousSchoolsIds { get; set; }
    public virtual IList<DocumentFile>? Documents { get; set;}
    public DateTime CreatedDate { get; set; } = DateTime.Now;
    public DateTime UpdatedDate { get; set; }
  }
}