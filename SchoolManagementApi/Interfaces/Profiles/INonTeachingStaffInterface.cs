using SchoolManagementApi.DTOs;
using SchoolManagementApi.Models.DocumentModels;
using SchoolManagementApi.Models.UserModels;

namespace SchoolManagementApi.Intefaces.Profiles
{
  public interface INonTeachingStaffInterface
  {
    Task<NonTeachingStaff> AddNonTeachingStaff(NonTeachingStaff nonTeachingStaff);
    Task<NonTeachingStaff> GetStaffById(string userId);
    Task<NonTeachingStaff> GetStaffByUniqueId(string uniqueId);
    Task<bool> NonTeachingStaffExists(string userId);
    Task<DocumentFile> UploadDocuments(string userId, List<FileNameContent> files);
  }
}