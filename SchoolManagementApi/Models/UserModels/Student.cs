using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SchoolManagementApi.Models.DocumentModels;

namespace SchoolManagementApi.Models.UserModels
{
  public class Student
  {
    [Key]
    public Guid StudentId { get; set; }
    [ForeignKey("UserId")]
    public string UserId { get; set; }
    public virtual ApplicationUser User { get; set; }
    public string MiddleName { get; set; }
    public string AdmissionNumber { get; set; }
    public string AdmissionYear { get; set; }

    [ForeignKey("SchoolId")]
    public Guid SchoolId { get; set; }
    public virtual School CurrentSchool { get; set; }

    [ForeignKey("DepartmentId")]
    public Guid DepartmentId { get; set; }
    public virtual Department Department { get; set; }

    [ForeignKey("StudentClassId")]
    public Guid StudentClassId { get; set; }
    public virtual ClassArms StudentClass { get; set; }

    public virtual List<School> PreviousSchools { get; set; }
    public string ProfilePicture { get; set; }
    public string Gender { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
    public string Address { get; set; }
    public string Religion { get; set; }
    public virtual IList<DocumentFile>? Documents { get; set;}

    [ForeignKey("ParentId")]
    public Guid ParentId { get; set; }
    public virtual Parent Parent { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }
  }
}