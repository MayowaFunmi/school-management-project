using Microsoft.EntityFrameworkCore;
using SchoolManagementApi.Data;
using SchoolManagementApi.Intefaces.Admin;
using SchoolManagementApi.Intefaces.LoggerManager;
using SchoolManagementApi.Models;
using SchoolManagementApi.Models.UserModels;
using WatchDog;

namespace SchoolManagementApi.Services.Admin
{
  public class ZoneService(ApplicationDbContext context, ILoggerManager logger) : IZoneService
  {
    private readonly ApplicationDbContext _context = context;
    private readonly ILoggerManager _logger = logger;

    public async Task<List<Zone>> AllOrganizationZones(string organizationId)
    {
      try
      {
        var zones = await _context.Zones
          .Include(x => x.Schools)
          .Where(x => x.OrganizationId.ToString() == organizationId)
          .ToListAsync();
        return zones;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error getting all organization zones- {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error getting all organization zones - {ex.Message}");
        throw;
      }
    }

    public async Task<Zone> CreateZone(Zone zone)
    {
      try
      {
        var result = _context.Zones.Add(zone);
        await _context.SaveChangesAsync();
        return result.Entity;
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error Creating Zones - {ex.Message}");
        WatchLogger.LogError(ex.ToString(), $"Error Creating Zones - {ex.Message}");
        throw;
      }
    }

        public Task<List<TeachingStaff>> GetAllTeachersInZone(string zoneId, int page, int pageSize)
        {
            throw new NotImplementedException();
        }

        public async Task<string> OrganizationExists(string organizationUniqueId, string adminId)
    {
      try
      {
        var orgId = string.Empty;
        var organizationExists = await _context.Organizations
          .Include(o => o.Admin)
          .Include(o => o.Zones)
          .FirstOrDefaultAsync(x => x.OrganizationUniqueId == organizationUniqueId);
        if (organizationExists != null && organizationExists.AdminId == adminId)
        {
          orgId = organizationExists.OrganizationId.ToString();
        }
        return orgId;
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