using SchoolManagementApi.Models;

namespace SchoolManagementApi.Intefaces.Admin
{
  public interface IZoneService
  {
    Task<Zone> CreateZone(Zone zone);
    Task<List<Zone>> AllOrganizationZones(string organizationId);
    Task<string> OrganizationExists(string organizationUniqueId, string adminId);
  }
}