using Microsoft.EntityFrameworkCore;
using MongoDB.Driver.Linq;
using SchoolManagementApi.Data;
using SchoolManagementApi.Intefaces.Admin;
using SchoolManagementApi.Intefaces.LoggerManager;
using SchoolManagementApi.Models;
using WatchDog;

namespace SchoolManagementApi.Services.Admin
{
  public class DepartmentServices(ApplicationDbContext context, ILoggerManager logger) : IDepartmentServices
  {
    private readonly ApplicationDbContext _context = context;
    private readonly ILoggerManager _logger = logger;

    public async Task<Department> AddDepartment(Department department)
    {
      try
      {
        var dept = _context.Departments.Add(department);
        await _context.SaveChangesAsync();
        return dept.Entity;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error Creating Department - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error Creating Department - {ex.Message}");
        throw;
      }
    }

    public async Task<List<Department>> GetSchoolDepartments(string schoolId)
    {
      try
      {
        return await _context.Departments.Where(d => d.SchoolId.ToString() == schoolId).ToListAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting all school departments- {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting all school departments - {ex.Message}");
        throw;
      }
    }
  }
}