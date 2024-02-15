using SchoolManagementApi.Models;

namespace SchoolManagementApi.Intefaces.Admin
{
  public interface ISchoolServices
  {
    Task<School> AddSchool(School school);
    Task<bool> OrganizationExists(string organizationUniqueId, string adminId);
    Task<List<School>> AllScchools(int page, int pageSize);
    Task<int> AllSchoolCount();
    Task<int> AllOrganizationSchoolsCount(string OrganizationUniqueId);
    Task<int> AllSchoolsInZoneCount(string ZoneId);
    Task<List<School>> AllOrganizationScchools(string OrganizationUniqueId, int page, int pageSize);
    Task<List<School>> AllZoneScchools(string ZoneId, int page, int pageSize);
  }
}