using Microsoft.EntityFrameworkCore;
using SchoolManagementApi.Data;
using SchoolManagementApi.Intefaces.LoggerManager;
using SchoolManagementApi.Intefaces.Profiles;
using SchoolManagementApi.Models.UserModels;
using WatchDog;

namespace SchoolManagementApi.Services.Profiles
{
  public class TeachingStaffService(ApplicationDbContext context, ILoggerManager logger) : ITeachingStaffInterface
  {
    private readonly ApplicationDbContext _context = context;
    private readonly ILoggerManager _logger = logger;

    public async Task<TeachingStaff> AddTeachingStaff(TeachingStaff teachingStaff)
    {
      try
      {
        var result = _context.TeachingStaffs.Add(teachingStaff);
        await _context.SaveChangesAsync();
        return result.Entity;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error adding teaching staff - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error adding teaching staff - {ex.Message}");
        throw;
      }
    }

    public async Task<TeachingStaff> GetTeacherById(string userId)
    {
      try
      {
        var teacher = await _context.TeachingStaffs
          .Where(t => t.UserId == userId)
          .Include(t => t.User)
          .Include(t => t.CurrentPostingZone)
          .Include(t => t.CurrentPostingSchool)
          .Include(t => t.PreviousPosting1)
          .Include(t => t.PreviousPosting2)
          .Include(t => t.PreviousPosting3)
          .Include(t => t.Documents)
          .Include(t => t.CurrentSubject)
          .Include(t => t.OtherSubjects)
          .FirstOrDefaultAsync();

        return teacher!;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting teacher by id - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting teacher by id - {ex.Message}");
        throw;
      }
    }

    public async Task<TeachingStaff> GetTeacherByUniqueId(string uniqueId)
    {
      try
      {
        var teacher = await _context.TeachingStaffs
          .Where(t => t.User.UniqueId == uniqueId)
          .Include(t => t.User)
          .Include(t => t.CurrentPostingZone)
          .Include(t => t.CurrentPostingSchool)
          .Include(t => t.PreviousPosting1)
          .Include(t => t.PreviousPosting2)
          .Include(t => t.PreviousPosting3)
          .Include(t => t.Documents)
          .Include(t => t.CurrentSubject)
          .Include(t => t.OtherSubjects)
          .FirstOrDefaultAsync();

        return teacher!;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting teacher by unique id - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting teacher by unique id - {ex.Message}");
        throw;
      }
    }

    public async Task<bool> TeachingStaffExists(string userId)
    {
      try
      {
        var teacherExists = await _context.TeachingStaffs.FirstOrDefaultAsync(t => t.UserId == userId);
        if (teacherExists != null)
          return true;
        return false;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error checking if teacher profile already exists - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error checking if teacher profile already exists - {ex.Message}");
        throw;
      }
    }
  }
}