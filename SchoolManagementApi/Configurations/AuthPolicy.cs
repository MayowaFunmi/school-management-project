using Microsoft.AspNetCore.Authorization;

namespace SchoolManagementApi.Configurations
{
  public class AuthPolicy
  {
    public static void ConfigureAuthorization(AuthorizationOptions options)
    {
      options.AddPolicy("OwnerOnly", policy => policy.RequireRole("Owner"));
      options.AddPolicy("OwnerAdminSuperAdmin", policy => policy.RequireRole("Owner", "Admin", "SuperAdmin"));
      options.AddPolicy("OwnerSuperAdmin", policy => policy.RequireRole("Owner", "SuperAdmin"));
      options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
      options.AddPolicy("AdminSuperAdmin", policy => policy.RequireRole("Admin", "SuperAdmin"));
    }
  }
}