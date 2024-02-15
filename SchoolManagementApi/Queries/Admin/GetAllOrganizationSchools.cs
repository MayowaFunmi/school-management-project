using System.Net;
using MediatR;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Admin;

namespace SchoolManagementApi.Queries.Admin
{
  public class GetAllOrganizationSchools
  {
    public class GetAllOrganizationSchoolsQuery : IRequest<GenericResponse>
    {
      public string AdminId { get; set; } = string.Empty;
      public string? OrganizationUniqueId { get; set; }
      public int Page { get; set; }
      public int PageSize { get; set; }
    }

    public class GetAllOrganizationSchoolsHandler(ISchoolServices schoolServices) : IRequestHandler<GetAllOrganizationSchoolsQuery, GenericResponse>
    {
      private readonly ISchoolServices _schoolServices = schoolServices;

      public async Task<GenericResponse> Handle(GetAllOrganizationSchoolsQuery request, CancellationToken cancellationToken)
      {
        int totalSchoolCount = await _schoolServices.AllOrganizationSchoolsCount(request.OrganizationUniqueId!);
        int totalPages = (int)Math.Ceiling((double)totalSchoolCount / request.PageSize);
        
        try
        {
          var schools = await _schoolServices.AllOrganizationScchools(request.OrganizationUniqueId!, request.Page, request.PageSize);
          if (schools != null)
          {
            var response = new PaginationResponse
            {
              Schools = schools,
              TotalPages = totalPages,
              CurrentPage = request.Page,
              PagesLeft = totalPages - request.Page,
            };
            return new GenericResponse
            {
              Status = HttpStatusCode.OK.ToString(),
              Message = $"{schools.Count} schools retrieved for organization with id {request.OrganizationUniqueId}",
              Data = response
            };
          }
          return new GenericResponse
          {
            Status = HttpStatusCode.NotFound.ToString(),
            Message = $"No school found for organization with id {request.OrganizationUniqueId}",
          };
        }
        catch (Exception ex)
        {
          return new GenericResponse
          {
            Status = HttpStatusCode.InternalServerError.ToString(),
            Message = $"An internal server error occurred - {ex.Message}"
          };
        }
      }
    }
  }
}