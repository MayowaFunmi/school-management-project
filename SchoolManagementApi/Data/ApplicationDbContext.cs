using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SchoolManagementApi.Models;
using SchoolManagementApi.Models.DocumentModels;
using SchoolManagementApi.Models.UserModels;

namespace SchoolManagementApi.Data
{
  public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<ApplicationUser>(options)
  {
    public DbSet<Organization> Organizations { get; set; }
    public DbSet<Zone> Zones { get; set; }
    public DbSet<School> Schools { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<StudentClass> StudentClasses { get; set; }
    public DbSet<ClassArms> ClassArms { get; set; }
    public DbSet<Subject> Subjects { get; set; }
    public DbSet<TeachingStaff> TeachingStaffs { get; set; }
    public DbSet<NonTeachingStaff> NonTeachingStaffs { get; set; }
    public DbSet<Parent> Parents { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<DocumentFile> DocumentFiles { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<IdentityUserRole<string>>().HasKey(ur => new { ur.UserId, ur.RoleId });

      modelBuilder.Entity<Organization>()
        .HasIndex(o => o.OrganizationUniqueId)
        .IsUnique();
      
      modelBuilder.Entity<School>()
        .HasIndex(s => s.SchoolUniqueId)
        .IsUnique();

      modelBuilder.Entity<NonTeachingStaff>()
        .HasOne(s => s.CurrentPostingZone)
        .WithMany()
        .OnDelete(DeleteBehavior.NoAction);

      modelBuilder.Entity<TeachingStaff>()
        .HasOne(s => s.CurrentPostingZone)
        .WithMany()
        .OnDelete(DeleteBehavior.NoAction);
      
      modelBuilder.Entity<Student>()
        .HasOne(s => s.Parent)
        .WithMany()
        .OnDelete(DeleteBehavior.NoAction);

      modelBuilder.Entity<Student>()
        .HasOne(s => s.StudentClass)
        .WithMany()
        .OnDelete(DeleteBehavior.NoAction);

      modelBuilder.Entity<Student>()
        .HasOne(s => s.Department)
        .WithMany()
        .OnDelete(DeleteBehavior.NoAction);

      modelBuilder.Entity<Student>()
        .HasOne(s => s.CurrentSchool)
        .WithMany()
        .OnDelete(DeleteBehavior.NoAction);

      modelBuilder.Entity<Student>()
        .HasOne(s => s.SchoolZone)
        .WithMany()
        .OnDelete(DeleteBehavior.NoAction);

      modelBuilder.Entity<Parent>()
        .HasOne(s => s.StudentSchool)
        .WithMany()
        .OnDelete(DeleteBehavior.NoAction);

      modelBuilder.Entity<StudentClass>()
        .HasMany(sc => sc.ClassArms)
        .WithOne()
        .HasForeignKey(ca => ca.StudentClassId)
        .OnDelete(DeleteBehavior.Cascade);

      modelBuilder.Entity<School>()
        .HasOne(s => s.Zone)
        .WithMany(z => z.Schools)
        .OnDelete(DeleteBehavior.NoAction);

      // modelBuilder.Entity<Department>()
      //   .HasOne(d => d.School)
      //   .WithMany(s => s.Departments)
      //   .OnDelete(DeleteBehavior.NoAction);

      // modelBuilder.Entity<ClassArms>()
      //   .HasOne(c => c.StudentClass)
      //   .WithMany(s => s.ClassArms)
      //   .OnDelete(DeleteBehavior.NoAction);
        
    }
  }
}