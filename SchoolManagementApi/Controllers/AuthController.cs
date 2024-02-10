using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SchoolManagementApi.Configurations;
using SchoolManagementApi.Constants;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Models.UserModels;
using SchoolManagementApi.Utilities;

namespace SchoolManagementApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration) : ControllerBase
  {
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;
    private readonly IConfiguration _configuration = configuration;

    // register users
    [HttpPost]
    [Route("signup")]
    public async Task<GenericResponse> Register([FromBody] RegisterDto registerDto)
    {
      var isUsernameExists = await _userManager.FindByNameAsync(registerDto.UserName);
      var isEmailExists = await _userManager.FindByEmailAsync(registerDto.Email);

      if (isUsernameExists != null)
      {
        return new GenericResponse
        {
          Status = HttpStatusCode.OK.ToString(),
          Message = $"{registerDto.UserName} is already registered. Try to login or click on forgot password"
        };
      }

      if (isEmailExists != null)
      {
        return new GenericResponse
        {
          Status = HttpStatusCode.OK.ToString(),
          Message = $"{registerDto.Email} is already registered. Try to login or click on forgot password"
        };
      }

      var newUser = new ApplicationUser
      {
        UniqueId = GenerateUserCode.GenerateUserUniqueId(),
        Email = registerDto.Email,
        UserName = registerDto.UserName,
        FirstName = registerDto.FirstName,
        LastName = registerDto.LastName,
        PhoneNumber = registerDto.PhoneNumber,
        SecurityStamp = Guid.NewGuid().ToString(),
        CreatedAt = DateTime.Now,
        UpdatedAt = DateTime.Now  
      };
      var createdUser = await _userManager.CreateAsync(newUser, registerDto.Password);
      if (!createdUser.Succeeded)
      {
        return new GenericResponse
        {
          Status = HttpStatusCode.BadRequest.ToString(),
          Message = "User Creation Failed"
        };
      }
      await _userManager.AddToRoleAsync(newUser, StaticUserRoles.Users);
      return new GenericResponse
      {
        Status = HttpStatusCode.OK.ToString(),
        Message = "User Created successfully",
        Data = registerDto
      };
    }

    // login route
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
      var user = await _userManager.FindByNameAsync(loginDto.UserName);
      if (user is null)
        return Unauthorized("Username not found!");
      
      var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginDto.Password);
      if (!isPasswordCorrect)
        return Unauthorized("Incorrect Password");
      
      var userRoles = await _userManager.GetRolesAsync(user);
      var authClaims = new List<Claim>
      {
        new(ClaimTypes.Name, user.UserName!),
        new(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new(ClaimTypes.Email, user.Email!),
        new("JWTID", Guid.NewGuid().ToString())
      };

      foreach (var userRole in userRoles)
      {
        authClaims.Add(new Claim(ClaimTypes.Role, userRole));
      }
      // {
      //   var role = await _roleManager.FindByNameAsync(userRole);
      //   if (role != null)
      //   {
      //     authClaims.Add(new Claim(ClaimTypes.Role, role.Id));
      //   }
      // }

      var token = GenerateJsonWebToken(authClaims);
      Response.Headers.Authorization = "Bearer " + token;
      return Ok(token);
    }



    private string GenerateJsonWebToken(List<Claim> claims)
    {
      var jwt = new JwtCredentials
      {
        Secret = _configuration.GetSection("JWT:Secret").Value!,
        Issuer = _configuration.GetSection("JWT:ValidIssuer").Value!,
        Audience = _configuration.GetSection("JWT:ValidAudience").Value!,
        Lifetime = DateTime.Now.AddHours(Convert.ToDouble(_configuration.GetSection("JWT:Lifetime").Value))
      };
      var authSecret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Secret));

      // var tokenObject = new JwtSecurityToken(
      //   issuer: jwt.Issuer,
      //   audience: jwt.Audience,
      //   expires: jwt.Lifetime,
      //   claims: claims,
      //   signingCredentials: new SigningCredentials(authSecret, SecurityAlgorithms.HmacSha256)
      // );
      // string token = new JwtSecurityTokenHandler().WriteToken(tokenObject);
      // return token;
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Issuer = jwt.Issuer,
        Audience = jwt.Audience,
        Subject = new ClaimsIdentity(claims),
        Expires = jwt.Lifetime,
        SigningCredentials = new SigningCredentials(authSecret, SecurityAlgorithms.HmacSha256)
      };

      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }
  }
}