using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SchoolManagementApi.Data;

namespace SchoolManagementApi.Models
{
  public class StudentClass
  {
    public Guid StudentClassId { get; set; }

    [ForeignKey("SchoolId")]
    public Guid SchoolId { get; set; }
    public string Name { get; set; }  // ss1, ss2, etc
    [Range(1, int.MaxValue)]
    public int Arm { get; set; }
    public School School { get; set; }
    public List<ClassArms> ClassArms { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; }

    public void Save(ApplicationDbContext dbContext)
    {
      dbContext.StudentClasses.Add(this);
      dbContext.SaveChanges();
      GenerateClassArms(dbContext);
    }

    private void GenerateClassArms(ApplicationDbContext dbContext)
    {
      var classArms = Enumerable.Range(65, Arm).Select(i => $"{Name}{(char)i}").ToList();
      foreach (var armName in classArms)
      {
        dbContext.ClassArms.Add(new ClassArms
        {
          SchoolId = SchoolId,
          StudentClassId = StudentClassId,
          Name = armName
        });
        dbContext.SaveChanges();
      }
    }
  }
}