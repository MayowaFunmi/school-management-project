using System.Net;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementApi.Commands.Admin;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Admin;
using SchoolManagementApi.Queries.Admin;

namespace SchoolManagementApi.Controllers
{
  public class AdminController(IAdminService adminService, IMediator mediator) : BaseController
  {
    private readonly IAdminService _adminService = adminService;
    private readonly IMediator _mediator = mediator;

    [HttpGet]
    [Route("get-all-users")]
    [Authorize(Policy = "OwnerOnly")]
    public async Task<GenericResponse> ShowAllUsers()
    {
      var usersWithRoles = await _adminService.GetAllUsersWithRoles();
      return new GenericResponse
      {
        Status = HttpStatusCode.OK.ToString(),
        Message = $"{usersWithRoles.Count} users found",
        Data = usersWithRoles
      };
    }

    [HttpPost]
    [Route("create-organization")]
    [Authorize(Policy = "Admin")]
    public async Task<IActionResult> CreateOrganization(CreateOrganization.CreateOrganizationsCommand request)
    {
      try
      {
        if (string.IsNullOrEmpty(request.OrganizationName))
        {
            return BadRequest("Organization Name cannot be empty");
        }

        if (string.IsNullOrEmpty(CurrentUserId))
        {
            return Unauthorized("You are not an admin");
        }
        request.AdminId = CurrentUserId!;
        var response = await _mediator.Send(request);
        return response.Status == HttpStatusCode.OK.ToString()
          ? Ok(response) : BadRequest(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred while processing your request - {ex.Message}");
      }
    }

    [HttpPost]
    [Route("create-organization-for-admin/{adminId}")]
    [Authorize(Policy = "OwnerSuperAdmin")]

    public async Task<IActionResult> CreateOrganizationForAdmin(string adminId)
    {
      var request = new CreateOrganization.CreateOrganizationsCommand
      {
          AdminId = adminId
      };
      var response = await _mediator.Send(request);
      return response.Status == HttpStatusCode.OK.ToString()
        ? Ok(response) : BadRequest(response);
    }


    [HttpGet]
    [Route("all-admin-organizations")]
    [Authorize(Policy = "OwnerSuperAdmin")]
    public async Task<IActionResult> AllAdminOrganizations(GetOrganizationsByAdminId.GetOrganizationByAdminIdQuery request)
    {
      request.AdminId = CurrentUserId!;
      var response = await _mediator.Send(request);
      return response.Status == HttpStatusCode.OK.ToString()
        ? Ok(response) : BadRequest(response);
    }

    [HttpGet]
    [Route("get-admin-organizations/{adminId}")]
    [Authorize(Policy = "Admin")]

    public async Task<IActionResult> GetAllAdminOrganizations(string adminId)
    {
      var request = new GetOrganizationsByAdminId.GetOrganizationByAdminIdQuery
      {
          AdminId = adminId
      };
      var response = await _mediator.Send(request);
      return response.Status == HttpStatusCode.OK.ToString()
        ? Ok(response) : BadRequest(response);
    }

    [HttpGet]
    [Route("get-all-organizations")]
    //[Authorize(Policy = "OwnerOnly")]
    public async Task<IActionResult> AllOrganizations()
    {
      var response = await _mediator.Send(new GetAllOrganizations.GetAllOrganizationsQuery());
      return response.Status == HttpStatusCode.OK.ToString()
        ? Ok(response) : BadRequest(response);
    }

    [HttpPost]
    [Route("add-zone")]
    [Authorize(Policy = "Admin")]
    public async Task<IActionResult> CreateZone(CreateZone.CreateZoneCommand request)
    {
      try
      {
        if (string.IsNullOrEmpty(request.OrganizationUniqueId) && string.IsNullOrEmpty(request.ZoneName))
        {
            return BadRequest("Zone Name and Organization Unique Id cannot be empty");
        }

        if (string.IsNullOrEmpty(CurrentUserId))
        {
            return Unauthorized("You are not an admin");
        }
        request.AdminId = CurrentUserId!;
        var response = await _mediator.Send(request);
        return response.Status == HttpStatusCode.OK.ToString()
          ? Ok(response) : BadRequest(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred while processing your request - {ex.Message}");
      }
    }

    [HttpGet]
    [Route("get-all-organization-zones/{organizationUniqueId}")]
    public async Task<IActionResult> GetOranizationZones(string organizationUniqueId)
    {
      try
      {
        if (string.IsNullOrEmpty(organizationUniqueId))
        {
          return BadRequest("Organization Unique Id cannot be empty");
        }
        var response = await _mediator.Send(new GetOrganizationZones.GetOrganizationZonesQuery(organizationUniqueId));
        return response.Status == HttpStatusCode.OK.ToString()
          ? Ok(response) : BadRequest(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred while processing your request - {ex.Message}");
      }
    }


    [HttpPost]
    [Route("add-zone-for-admin/{adminId}")]
    [Authorize(Policy = "OwnerSuperAdmin")]

    public async Task<IActionResult> CreateZoneForAdmin(string adminId)
    {
      var request = new CreateZone.CreateZoneCommand
      {
          AdminId = adminId
      };
      var response = await _mediator.Send(request);
      return response.Status == HttpStatusCode.OK.ToString()
        ? Ok(response) : BadRequest(response);
    }

    [HttpGet]
    [Route("get-user-by-unique-id/{uniqueId}")]
    [Authorize]
    public async Task<GenericResponse> GetUserDetails(string uniqueId)
    {
      try
      {
        var user = await _adminService.GetUserByUniqueId(uniqueId);
        if (user == null)
        {
          return new GenericResponse
          {
            Status = HttpStatusCode.NotFound.ToString(),
            Message = $"User with unique id {uniqueId} not found"
          };
        }
        return new GenericResponse
        {
          Status = HttpStatusCode.OK.ToString(),
          Message = "User details found",
          Data = user
        };
      }
      catch (Exception ex)
      {
       return new GenericResponse
        {
          Status = HttpStatusCode.InternalServerError.ToString(),
          Message = $"Internal server error occured - {ex.Message}",
        };
      }
    }
  }
}