using System.Net;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Admin;

namespace SchoolManagementApi.Controllers
{
  public class SchoolController(IMediator mediator, ISchoolServices schoolServices) : BaseController
  {
    private readonly IMediator _mediator = mediator;
    private readonly ISchoolServices _schoolServices = schoolServices;

    [HttpGet]
    [Route("get-schools-by-id")]
    public async Task<IActionResult> SchoolById([FromQuery] List<string> schoolIds)
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
  }
}