using System.Net;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementApi.Commands.Profiles;
using SchoolManagementApi.Queries.Profiles;
using SchoolManagementApi.Queries.School;

namespace SchoolManagementApi.Controllers
{
  public class StudentController(IMediator mediator) : BaseController
  {
    private readonly IMediator _mediator = mediator;
    
    [HttpPost]
    [Route("create-student-profile")]
    [Authorize(Policy = "Student")]
    public async Task<IActionResult> CreateStudentProfile(AddStudent.AddStudentCommand request)
    {
      try
      {
        if (string.IsNullOrEmpty(CurrentUserId))
          return BadRequest("You are not allowed");

        if (CurrentUserId != request.UserId)
          return BadRequest("You are not allowed to create teacher profile");

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
    [Route("get-student-profile/{studentId}")]
    [Authorize]

    public async Task<IActionResult> GetParentById(string studentId)
    {
      try
      {
        if (string.IsNullOrEmpty(CurrentUserId))
          return BadRequest("You are not an authenticated");
        if (string.IsNullOrEmpty(studentId))
          return BadRequest("student Id cannot be empty");
        if (studentId != CurrentUserId)
          return BadRequest("Logged in user and staff id are not the same");

        var response = await _mediator.Send(new GetStudentById.GetStudentByIdQuery(studentId));
        return response.Status == HttpStatusCode.OK.ToString()
          ? Ok(response) : BadRequest(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred while processing your request - {ex.Message}");
      }
    }

    [HttpGet]
    [Route("get-students-in-class-arm/{studentClassId}")]
    [Authorize]

    public async Task<IActionResult> StudentsInClassArm(string studentClassId)
    {
      try
      {
        if (string.IsNullOrEmpty(CurrentUserId))
          return BadRequest("You are not an authenticated");
        if (string.IsNullOrEmpty(studentClassId))
          return BadRequest("class Id cannot be empty");
        
        var response = await _mediator.Send(new GetStudentsInClassArm.GetStudentsInClassArmQuery(studentClassId));
        return response.Status == HttpStatusCode.OK.ToString()
          ? Ok(response) : BadRequest(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred while processing your request - {ex.Message}");
      }
    }

    [HttpGet]
    [Route("get-students-in-class/{classId}")]
    [Authorize]
    public async Task<IActionResult> StudentsInClass(string classId)
    {
      try
      {
        if (string.IsNullOrEmpty(CurrentUserId))
          return BadRequest("You are not an authenticated");
        if (string.IsNullOrEmpty(classId))
          return BadRequest("class Id cannot be empty");
        
        var response = await _mediator.Send(new GetStudentsInClass.GetStudentsInClassQuery(classId));
        return response.Status == HttpStatusCode.OK.ToString()
          ? Ok(response) : BadRequest(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred while processing your request - {ex.Message}");
      }
    }
  }
}