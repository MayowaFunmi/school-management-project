using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SchoolManagementApi.Data;
using SchoolManagementApi.DTOs;
using SchoolManagementApi.Intefaces.Admin;
using SchoolManagementApi.Intefaces.LoggerManager;
using SchoolManagementApi.Models;
using SchoolManagementApi.Models.UserModels;
using WatchDog;

namespace SchoolManagementApi.Services.Admin
{
    public class AdminService(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILoggerManager logger) : IAdminService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly RoleManager<IdentityRole> _roleManager = roleManager;
        private readonly ILoggerManager _logger = logger;

        public async Task<List<UserWithRoles>> GetAllUsersWithRoles()
        {
            try
            {
                List<UserWithRoles> userWithRoles = [];
                var allusers = await _userManager.Users.ToListAsync();
                foreach (var user in allusers)
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    var userRoles = new List<IdentityRole>();
                    foreach (var roleName in roles)
                    {
                        var role = await _roleManager.FindByNameAsync(roleName);
                        userRoles.Add(role);
                    }
                    userWithRoles.Add(new UserWithRoles
                    {
                        User = user,
                        UserRoles = userRoles
                    });
                }
                return userWithRoles;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting all users with roles - {ex.Message}");
                WatchLogger.LogError(ex.ToString(), $"Error getting all users with roles - {ex.Message}");
                throw;
            }
        }

        public async Task<UserWithRoles> GetUserByUniqueId(string uniqueId)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UniqueId == uniqueId);
                var roles = await _userManager.GetRolesAsync(user!);
                var userRoles = new List<IdentityRole>();
                foreach (var roleName in roles)
                {
                    var role = await _roleManager.FindByNameAsync(roleName);
                    userRoles.Add(role!);
                }
                return new UserWithRoles
                {
                    User = user!, UserRoles = userRoles
                };
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting user with uniqueId - {ex.Message}");
                WatchLogger.LogError(ex.ToString(), $"Error getting user with uniqueId - {ex.Message}");
                throw;
            }
        }

        public async Task<List<Subject>> GetSubjectsInSchool()
        {
            try
            {
                return await _context.Subjects.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting Subjects - {ex.Message}");
                WatchLogger.LogError(ex.ToString(), $"Error getting Subjects - {ex.Message}");
                throw;
            }
        }
    }
}