using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using SchoolManagementApi.Data;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Uploads;
using SchoolManagementApi.Models.DocumentModels;

namespace SchoolManagementApi.Services.Uploads
{
  public class FileService(ApplicationDbContext context, Cloudinary cloudinary) : IFileService
  {
    private readonly ApplicationDbContext _context = context;
    private readonly Cloudinary _cloudinary = cloudinary;

    public async Task<string> ProcessFilesAsync(UploadFilesDto filesDto)
    {
      if (filesDto.FileContent == null || filesDto.FileContent.Length == 0)
        throw new ArgumentException("File is null or empty");

      var uploadParams = new ImageUploadParams()
      {
        File = new FileDescription(filesDto.FileContent.Name, filesDto.FileContent.OpenReadStream()),
        PublicId = Guid.NewGuid().ToString(), // Generate unique public ID
        UseFilename = true,
        UniqueFilename = false,
      };
      var uploadResult = await _cloudinary.UploadAsync(uploadParams);
      return uploadResult.Url.ToString();
    }
  }
}