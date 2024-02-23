using SchoolManagementApi.DTOs;
using SchoolManagementApi.Models;
using SchoolManagementApi.Models.UserModels;

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
    Task<List<OrganizationData>> OrganizationData(string organizationUniqueId);
    Task<List<School>> AllZoneScchools(string ZoneId, int page, int pageSize);
    Task<List<TeachingStaff>> GetAllTeachersInSchool(string schoolId, int page, int pageSize);
  }
}