using Microsoft.EntityFrameworkCore;
using SchoolManagementApi.Data;
using SchoolManagementApi.Intefaces.Admin;
using SchoolManagementApi.Intefaces.LoggerManager;
using SchoolManagementApi.Models;
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
  }
}