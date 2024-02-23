using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SchoolManagementApi.Models.DocumentModels;
using static SchoolManagementApi.Constants.RoleCionstants;

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
    public string SchoolId { get; set; }
    public virtual School CurrentSchool { get; set; }

    [ForeignKey("DepartmentId")]
    public string DepartmentId { get; set; }
    public virtual Department Department { get; set; }

    [ForeignKey("StudentClassId")]
    public string StudentClassId { get; set; }
    public virtual ClassArms StudentClass { get; set; }

    public virtual List<School> PreviousSchools { get; set; }
    public string ProfilePicture { get; set; }
    public GenderEnum Gender { get; set; } = GenderEnum.Male;
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
    public string Address { get; set; }
    public ReligionEnum Religion { get; set; } = ReligionEnum.Christianity;
    public virtual IList<DocumentFile>? Documents { get; set;}


    [ForeignKey("Parent1Id")]
    public string Parent1Id { get; set; }
    public virtual Parent Parent1 { get; set; }

    [ForeignKey("Parent12d")]
    public string Parent2Id { get; set; }
    public virtual Parent Parent2 { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }
  }
}