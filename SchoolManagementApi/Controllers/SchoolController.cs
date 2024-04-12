using System.Net;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Admin;
using SchoolManagementApi.Queries.Admin;

namespace SchoolManagementApi.Controllers
{
  public class SchoolController(IMediator mediator, ISchoolServices schoolServices) : BaseController
  {
    private readonly IMediator _mediator = mediator;
    private readonly ISchoolServices _schoolServices = schoolServices;

    [HttpGet]
    [Route("get-schools-by-id")]
    public async Task<IActionResult> SchoolsById([FromQuery] List<string> schoolIds)
    {
      var schools = await _schoolServices.GetSchoolByIdList(schoolIds);
      if (schools.Count == 0)
      {
        return Ok(new GenericResponse
        {
          Status = HttpStatusCode.OK.ToString(),
          Message = "No School Found",
          Data = null
        });
      }
      return Ok(new GenericResponse
      {
        Status = HttpStatusCode.OK.ToString(),
        Message = "Schools retrieved from ids successfully",
        Data = schools
      });
    }

    [HttpGet]
    [Route("get-school-by-id/{schoolId}")]
    [Authorize]
    public async Task<IActionResult> GetSchool(string schoolId)
    {
      try
      {
        if (string.IsNullOrEmpty(schoolId))
          return BadRequest("School Id cannot be null");
        var response = await _mediator.Send(new GetSchoolDepartments.GetSchoolDepartmentsQuery(schoolId));
          return response.Status == HttpStatusCode.OK.ToString()
          ? Ok(response) : BadRequest(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred while processing your request - {ex.Message}");
      }
    }

    [HttpGet]
    [Route("get-subjects-by-id")]
    public async Task<IActionResult> SubjectsById([FromQuery] List<string> subjectIds)
    {
      var subjects = await _schoolServices.GetSubjectsByIdList(subjectIds);
      if (subjects.Count == 0)
      {
        return Ok(new GenericResponse
        {
          Status = HttpStatusCode.OK.ToString(),
          Message = "No Subject Found",
          Data = null
        });
      }
      return Ok(new GenericResponse
      {
        Status = HttpStatusCode.OK.ToString(),
        Message = "Subjects retrieved from ids successfully",
        Data = subjects
      });
    }

    [HttpGet]
    [Route("get-school-departments/{schoolId}")]
    public async Task<IActionResult> SchoolDepartments(string schoolId)
    {
      var departments = await _schoolServices.GetDepartmentsBySchoolId(schoolId);
      if (departments.Count == 0)
      {
        return Ok(new GenericResponse
        {
          Status = HttpStatusCode.OK.ToString(),
          Message = "No Department Found",
          Data = null
        });
      }
      return Ok(new GenericResponse
      {
        Status = HttpStatusCode.OK.ToString(),
        Message = "Departments in school retrieved successfully",
        Data = departments
      });
    }

    [HttpGet]
    [Route("get-school-class-list/{schoolId}")]
    public async Task<IActionResult> SchoolClassArms(string schoolId)
    {
      var classes = await _schoolServices.GetStudentClassesBySchoolId(schoolId);
      if (classes.Count == 0)
      {
        return Ok(new GenericResponse
        {
          Status = HttpStatusCode.OK.ToString(),
          Message = "No Class Arms Found",
          Data = null
        });
      }
      return Ok(new GenericResponse
      {
        Status = HttpStatusCode.OK.ToString(),
        Message = "Classes in school retrieved successfully",
        Data = classes
      });
    }

    [HttpGet]
    [Route("get-school-parents/{schoolId}")]
    public async Task<IActionResult> SchoolParents(string schoolId)
    {
      var parents = await _schoolServices.GetSchoolParents(schoolId);
      if (parents.Count == 0)
      {
        return Ok(new GenericResponse
        {
          Status = HttpStatusCode.OK.ToString(),
          Message = "No parents Found",
          Data = null
        });
      }
      return Ok(new GenericResponse
      {
        Status = HttpStatusCode.OK.ToString(),
        Message = "Classes in school retrieved successfully",
        Data = parents
      });
    }

    [HttpGet]
    [Route("search-school-by-param/{searchParam}")]
    [Authorize]
    public async Task<IActionResult> GetSchoolFromSearch(string searchParam)
    {
      try
      {
        if (string.IsNullOrEmpty(searchParam))
          return BadRequest("search parameter cannot be empty");
        var response = await _mediator.Send(new SearchSchool.SearchSchoolQuery(searchParam));
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