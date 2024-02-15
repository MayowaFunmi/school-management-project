using SchoolManagementApi.Models;

namespace SchoolManagementApi.Intefaces.Admin
{
  public interface IDepartmentServices
  {
    Task<Department> AddDepartment(Department department);
    Task<List<Department>> GetSchoolDepartments(string schoolId);
  }
}