using Microsoft.EntityFrameworkCore;
using SchoolManagementApi.Data;
using SchoolManagementApi.Intefaces.Admin;
using SchoolManagementApi.Intefaces.LoggerManager;
using SchoolManagementApi.Models;
using WatchDog;

namespace SchoolManagementApi.Services.Admin
{
  public class SubjectService(ApplicationDbContext context, ILoggerManager logger) : ISubjectService
  {
    private readonly ApplicationDbContext _context = context;
    private readonly ILoggerManager _logger = logger;

    public async Task<Subject> AddSubject(Subject subject)
    {
      try
      {
        var response = _context.Subjects.Add(subject);
        await _context.SaveChangesAsync();
        return response.Entity;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error Adding Subject - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error Adding Subject - {ex.Message}");
        throw;
      }
    }
  }
}