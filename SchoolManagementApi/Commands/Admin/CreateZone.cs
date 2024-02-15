using System.Net;
using MediatR;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Admin;

namespace SchoolManagementApi.Commands.Admin
{
  public class CreateZone
  {
    public class CreateZoneCommand : IRequest<GenericResponse>
    {
      public string? AdminId { get; set; }
      public string? OrganizationUniqueId { get; set; }
      public string? ZoneName { get; set; }
    }

    public class CreateZoneHandler(IZoneService zoneService) : IRequestHandler<CreateZoneCommand, GenericResponse>
    {
      private readonly IZoneService _zoneService = zoneService;

      public async Task<GenericResponse> Handle(CreateZoneCommand request, CancellationToken cancellationToken)
      {
        var organizationId = await _zoneService.OrganizationExists(request.OrganizationUniqueId!, request.AdminId!);
        if (string.IsNullOrEmpty(organizationId))
        {
          return new GenericResponse
          {
            Status = HttpStatusCode.NotFound.ToString(),
            Message = $"Organization with unique id {request.OrganizationUniqueId} cannot be null",
          };
        }

        var zone = new Models.Zone
        {
          OrganizationId = Guid.Parse(organizationId),
          Name = request.ZoneName!,
        };
        var response = await _zoneService.CreateZone(zone);
        if (response != null)
        {
          return new GenericResponse
          {
            Status = HttpStatusCode.OK.ToString(),
            Message = "Zone added sucessfully",
            Data = response
          };
        }
        return new GenericResponse
        {
          Status = HttpStatusCode.BadRequest.ToString(),
          Message = "Failed to add zone",
        };
      }
    }
  }
}