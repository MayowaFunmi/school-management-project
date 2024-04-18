using Microsoft.EntityFrameworkCore;
using SchoolManagementApi.Data;
using SchoolManagementApi.Intefaces.Admin;
using SchoolManagementApi.Intefaces.LoggerManager;
using SchoolManagementApi.Models;
using SchoolManagementApi.Models.UserModels;
using WatchDog;

namespace SchoolManagementApi.Services.Admin
{
  public class StudentClassServices(ApplicationDbContext context, ILoggerManager logger) : IStudentClassServices
  {
    private readonly ApplicationDbContext _context = context;
    private readonly ILoggerManager _logger = logger;

    public async Task<StudentClass> AddStudentClass(StudentClass studentClass)
    {
      try
      {
        var response = _context.StudentClasses.Add(studentClass);
        await _context.SaveChangesAsync();
        return response.Entity;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error adding student classes - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error adding student classes - {ex.Message}");
        throw;
      }
    }

    public async Task<bool> GenerateClassArms(StudentClass studentClass)
    {
      try
      {
        var classArms = Enumerable.Range(65, studentClass.Arm).Select(i => $"{studentClass.Name}{(char)i}").ToList();
        foreach (var armName in classArms)
        {
          var departmentId = AddDepartment(armName, _context);
          _context.ClassArms.Add(new ClassArms
          {
            SchoolId = studentClass.SchoolId,
            StudentClassId = studentClass.StudentClassId,
            Name = armName,
            DepartmentId = departmentId ?? null
          });

          await _context.SaveChangesAsync();
        }
        return true;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error generating student class arms - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error generating student class arms - {ex.Message}");
        throw;
      }
    }

    public async Task<List<ClassArms>> GetAllClassArms(string schoolId, string classId)
    {
      try
      {
        var classArms = await _context.ClassArms
          .Where(c => c.SchoolId.ToString() == schoolId && c.StudentClassId.ToString() == classId)
          .Include(c => c.Department)
          .ToListAsync();
        return classArms;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting all school's class arms - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting all school's class arms - {ex.Message}");
        throw;
      }
    }

    public async Task<List<StudentClass>> GetAllClasses(string schoolId)
    {
      try
      {
        var studentClasses = await _context.StudentClasses
          .Where(c => c.SchoolId.ToString() == schoolId)
          .Include(c => c.ClassArms)
          .ToListAsync();
        return studentClasses;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting all school's classes - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting all school's classes - {ex.Message}");
        throw;
      }
    }

    public async Task<List<Student>> StudentsByClassArm(string StudentClassId)
    {
      try
      {
        var students = await _context.Students
          .Where(s => s.StudentClassId.ToString() == StudentClassId)
          .Include(s => s.User)
          .Include(s => s.SchoolZone)
          .Include(s => s.CurrentSchool)
          .Include(s => s.Department)
          .Include(s => s.Parent)
          .Include(s => s.Documents)
          .ToListAsync();
        return students;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting students in the same class arm - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting students in the same class arm- {ex.Message}");
        throw;
      }
    }

    public async Task<List<Student>> StudentsByClass(string classId)
    {
      try
      {
        var students = await _context.Students
          .Include(s => s.StudentClass)
          .Include(s => s.User)
          .Include(s => s.SchoolZone)
          .Include(s => s.CurrentSchool)
          .Include(s => s.Department)
          .Include(s => s.Parent)
          .Include(s => s.Documents)
          .Where(s => s.StudentClass.StudentClassId.ToString() == classId)
          .ToListAsync();
        return students;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting students in the same class - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting - {ex.Message}");
        throw;
      }
    }

    private static Guid? AddDepartment(string armName, ApplicationDbContext dbContext)
    {
      var department = new Department();
      if (armName[0] == 'S')
      {
        var lastChar = char.ToUpper(armName[^1]);
        var departmentName = lastChar switch
        {
          'A' => "Science",
          'B' => "Arts",
          'C' => "Commercial",
          _ => null
        };
        department = dbContext.Departments.FirstOrDefault(d => d.Name == departmentName);
        return department?.DepartmentId;
      }
      else if (armName[0] == 'J')
      {
          // Retrieve the department from the database based on the name "Junior School"
          department = dbContext.Departments.FirstOrDefault(d => d.Name == "Junior School");
          return department?.DepartmentId;
      }
      
      // Return null if armName doesn't start with 'S' or 'J'
      return null;
    }
  }
}