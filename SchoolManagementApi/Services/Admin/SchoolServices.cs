using Microsoft.EntityFrameworkCore;
using SchoolManagementApi.Data;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Admin;
using SchoolManagementApi.Intefaces.LoggerManager;
using SchoolManagementApi.Models;
using SchoolManagementApi.Models.UserModels;
using WatchDog;

namespace SchoolManagementApi.Services.Admin
{
  public class SchoolServices(ApplicationDbContext context, ILoggerManager logger) : ISchoolServices
  {
    private readonly ApplicationDbContext _context = context;
    private readonly ILoggerManager _logger = logger;

    public async Task<School> AddSchool(School school)
    {
      try
      {
        var response = _context.Schools.Add(school);
        await _context.SaveChangesAsync();
        return response.Entity;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error Creating School - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error Creating School - {ex.Message}");
        throw;
      }
    }

    public async Task<List<School>> AllOrganizationScchools(string OrganizationUniqueId, int page, int pageSize)
    {
      try
      {
        List<School> schools = [];
        if (page == 0 || pageSize == 0)
        {
          schools = await _context.Schools
          .Where(s => s.OrganizationUniqueId == OrganizationUniqueId)
          .ToListAsync();
        }
        else
        {
          schools = await _context.Schools
          .Where(s => s.OrganizationUniqueId == OrganizationUniqueId)
          .Include(s => s.Departments)
          .Include(s => s.StudentClasses)
          .Skip((page - 1) * pageSize)
          .Take(pageSize)
          .ToListAsync();
        }
        return schools;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting all organization schools - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting all organization schools - {ex.Message}");
        throw;
      }
    }

    public async Task<int> AllOrganizationSchoolsCount(string OrganizationUniqueId)
    {
      return await _context.Schools.Where(s => s.OrganizationUniqueId == OrganizationUniqueId).CountAsync();
    }

    public async Task<List<School>> AllScchools(int page, int pageSize)
    {
      try
      {
        var schools = await _context.Schools
          .Include(s => s.Departments)
          .Include(s => s.StudentClasses)
          .Skip((page - 1) * pageSize)
          .Take(pageSize)
          .ToListAsync();
        return schools;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting all sCHOOLS - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting all Schools - {ex.Message}");
        throw;
      }
    }

    public async Task<int> AllSchoolCount()
    {
      return await _context.Schools.CountAsync();
    }

    public async Task<int> AllSchoolsInZoneCount(string ZoneId)
    {
      return await _context.Schools.Where(s => s.ZoneId.ToString() == ZoneId).CountAsync();
    }

    public async Task<List<School>> AllZoneScchools(string ZoneId, int page, int pageSize)
    {
      try
      {
        List<School> schools = [];
        if (page == 0 || pageSize == 0)
        {
          schools = await _context.Schools
            .Where(s => s.ZoneId.ToString() == ZoneId)
            .ToListAsync();
        }
        else
        {
          schools = await _context.Schools
          .Where(s => s.ZoneId.ToString() == ZoneId)
          .Include(s => s.Departments)
          .Include(s => s.StudentClasses)
          .Skip((page - 1) * pageSize)
          .Take(pageSize)
          .ToListAsync();
        }
        return schools;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting all Schools in the zone with id {ZoneId} - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting all Schools in the zone with id {ZoneId} - {ex.Message}");
        throw;
      }
    }

    public Task<List<TeachingStaff>> GetAllTeachersInSchool(string schoolId, int page, int pageSize)
    {
        throw new NotImplementedException();
    }

    public async Task<List<Department>> GetDepartmentsBySchoolId(string schoolId)
    {
      try
      {
        return await _context.Departments
          .Where(d => d.SchoolId.ToString() == schoolId)
          .ToListAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting departments in school - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting department in school - {ex.Message}");
        throw;
      }
    }

    public async Task<List<School>> GetSchoolByIdList(List<string> schoolIds)
    {
      try
      {
        return await _context.Schools
        .Where(s => schoolIds.Contains(s.SchoolId.ToString()))
        .ToListAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting list of schools - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting list of schools - {ex.Message}");
        throw;
      }
    }

        public async Task<List<Parent>> GetSchoolParents(string schoolId)
        {
          try
          {
            return await _context.Parents
            .Where(d => d.StudentSchoolId.ToString() == schoolId)
            .ToListAsync();
          }
          catch (Exception ex)
          {
            _logger.LogError($"Error getting parents in schools - {ex.Message}");
            WatchLogger.LogError(ex.ToString(), $"Error getting parents in schools - {ex.Message}");
            throw;
          }
        }

        public async Task<List<ClassArms>> GetStudentClassesBySchoolId(string schoolId)
    {
      try
      {
        return await _context.ClassArms
          .Where(d => d.SchoolId.ToString() == schoolId)
          .ToListAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting class arms in school - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting class arms in school - {ex.Message}");
        throw;
      }
    }

    public async Task<List<Subject>> GetSubjectsByIdList(List<string> subjectIds)
    {
      try
      {
        return await _context.Subjects
        .Where(s => subjectIds.Contains(s.SubjectId.ToString()))
        .ToListAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting list of subjects - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting list of subjects - {ex.Message}");
        throw;
      }
    }

    public async Task<List<OrganizationData>> OrganizationData(string organizationUniqueId)
    {
      try
      {
        return  await _context.Schools
          .Where(s => s.OrganizationUniqueId == organizationUniqueId)
          .Select(s => new OrganizationData
          {
            SchholName = s.Name,
            SchholAddress = s.Address,
            SchoolUniqueId = s.SchoolUniqueId
          })
          .ToListAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting organization's school data - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting organization's school data - {ex.Message}");
        throw;
      }
    }

    public async Task<bool> OrganizationExists(string organizationUniqueId, string adminId)
    {
      try
      {
        var organizationExists = await _context.Organizations
          .Include(o => o.Admin)
          .Include(o => o.Zones)
          .FirstOrDefaultAsync(x => x.OrganizationUniqueId == organizationUniqueId);
        if (organizationExists != null && organizationExists.AdminId == adminId)
          return true;
        else
          return false;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error checking if organization exists - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error checking if organization exists - {ex.Message}");
        throw;
      }
    }
  }
}