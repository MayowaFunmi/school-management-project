using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SchoolManagementApi.Data;

namespace SchoolManagementApi.Models
{
  public class ClassArms
  {
    [Key]
    public Guid ClassArmId { get; set; }

    [Required]
    public string Name { get; set; }

    [ForeignKey("SchoolId")]
    [Required]
    public Guid SchoolId { get; set; }
    
    [ForeignKey("StudentClassId")]
    public Guid StudentClassId { get; set; }

    [ForeignKey("DepartmentId")]
    public Guid? DepartmentId { get; set; }

    public Department? Department { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }

    public void Save(ApplicationDbContext dbContext)
    {
      AddDepartment(dbContext);
      dbContext.ClassArms.Add(this);
      dbContext.SaveChanges();
    }

    private void AddDepartment(ApplicationDbContext dbContext)
    {
      if (Name.Contains('A'))
      {
        Department = dbContext.Departments.FirstOrDefault(d => d.Name == "Science");
      }
      else if (Name.Contains('B'))
      {
        Department = dbContext.Departments.FirstOrDefault(d => d.Name == "Arts");
      }
      else if (Name.Contains('C'))
      {
        Department = dbContext.Departments.FirstOrDefault(d => d.Name == "Commercial");
      }
      else if (Name.Contains('J'))
      {
        Department = dbContext.Departments.FirstOrDefault(d => d.Name == "Junior School");
      }
      else
      {
        Department = null;
      }

      if (Department != null)
      {
        DepartmentId = Department.DepartmentId;
      }
    }
  }
}