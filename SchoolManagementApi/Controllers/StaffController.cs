using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementApi.Commands.Profiles;

namespace SchoolManagementApi.Controllers
{
  public class StaffController(IMediator mediator) : BaseController
  {
    private readonly IMediator _mediator = mediator;
    
    [HttpPost]
    [Route("add-teaching-staff")]
    [Authorize(Policy = "TeachingStaff")]
    public async Task<IActionResult> CreateTeacherProfile(AddTeachingStaff.AddTeachingStaffCommand request)
    {
      try
      {
        if (CurrentUserId != request.UserId)
          return BadRequest("You are not allowed to create teacher profile");
      }
      catch (System.Exception)
      {
        
        throw;
      }
    }
  }
}