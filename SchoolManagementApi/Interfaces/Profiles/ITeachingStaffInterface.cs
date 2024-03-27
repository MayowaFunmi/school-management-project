using SchoolManagementApi.Models;
using SchoolManagementApi.Models.DocumentModels;
using SchoolManagementApi.Models.UserModels;

namespace SchoolManagementApi.Intefaces.Profiles
{
  public interface ITeachingStaffInterface
  {
    Task<TeachingStaff> AddTeachingStaff(TeachingStaff teachingStaff);
    Task<TeachingStaff> GetTeacherById(string userId);
    Task<TeachingStaff> GetTeacherByUniqueId(string uniqueId);
    Task<TeachingStaff> TeachingStaffExists(string userId);
    Task<List<Zone>> AllOrganizationZones(string organizationUniqueId);
    Task<bool> OrganizationExists(string organizationUniqueId);
    Task<DocumentFile> UploadDocuments(string userId, List<string> filesUrls);
  }
}