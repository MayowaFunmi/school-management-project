namespace SchoolManagementApi.DTOs
{
  public class UploadFilesDto
  {
    public required string FileName { get; set; }
    public required IFormFile FileContent { get; set; }
  }
}