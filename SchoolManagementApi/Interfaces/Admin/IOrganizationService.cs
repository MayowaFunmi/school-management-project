using SchoolManagementApi.Models;

namespace SchoolManagementApi.Intefaces.Admin
{
  public interface IOrganizationService
  {
    Task<Organization> CreateOrganization(Organization organization);
    Task<List<Organization>> RetrieveAdminOrganizations(string adminId);
    Task<List<Organization>> AllOrganizations();
  }
}