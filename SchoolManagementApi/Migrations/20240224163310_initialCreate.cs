using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class initialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UniqueId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PercentageCompleted = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    SubjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SubjectName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.SubjectId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationUserIdentityRole",
                columns: table => new
                {
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RolesId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserIdentityRole", x => new { x.ApplicationUserId, x.RolesId });
                    table.ForeignKey(
                        name: "FK_ApplicationUserIdentityRole_AspNetRoles_RolesId",
                        column: x => x.RolesId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApplicationUserIdentityRole_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Organizations",
                columns: table => new
                {
                    OrganizationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrganizationUniqueId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AdminId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.OrganizationId);
                    table.ForeignKey(
                        name: "FK_Organizations_AspNetUsers_AdminId",
                        column: x => x.AdminId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Parents",
                columns: table => new
                {
                    ParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfilePicture = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Religion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaritalStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StateOfOrigin = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LgaOfOrigin = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LgaOfResidence = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Occupation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parents", x => x.ParentId);
                    table.ForeignKey(
                        name: "FK_Parents_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Zones",
                columns: table => new
                {
                    ZoneId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocalGovtAreas = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zones", x => x.ZoneId);
                    table.ForeignKey(
                        name: "FK_Zones_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "OrganizationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Schools",
                columns: table => new
                {
                    SchoolId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrganizationUniqueId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchoolUniqueId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ZoneId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocalGovtArea = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schools", x => x.SchoolId);
                    table.ForeignKey(
                        name: "FK_Schools_Zones_ZoneId",
                        column: x => x.ZoneId,
                        principalTable: "Zones",
                        principalColumn: "ZoneId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SchoolId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.DepartmentId);
                    table.ForeignKey(
                        name: "FK_Departments_Schools_SchoolId",
                        column: x => x.SchoolId,
                        principalTable: "Schools",
                        principalColumn: "SchoolId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NonTeachingStaffs",
                columns: table => new
                {
                    StaffProfileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MiddleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfilePicture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    StateOfOrigin = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LgaOfOrigin = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Religion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaritalStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AboutMe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Designation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GradeLevel = table.Column<int>(type: "int", nullable: false),
                    FirstAppointment = table.Column<DateTime>(type: "datetime2", nullable: true),
                    YearsInService = table.Column<int>(type: "int", nullable: false),
                    Qualification = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discipline = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentPostingZoneId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CurrentPostingSchoolId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PreviousPosting1Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PreviousPosting2Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PreviousPosting3Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NonTeachingStaffs", x => x.StaffProfileId);
                    table.ForeignKey(
                        name: "FK_NonTeachingStaffs_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NonTeachingStaffs_Schools_CurrentPostingSchoolId",
                        column: x => x.CurrentPostingSchoolId,
                        principalTable: "Schools",
                        principalColumn: "SchoolId");
                    table.ForeignKey(
                        name: "FK_NonTeachingStaffs_Schools_PreviousPosting1Id",
                        column: x => x.PreviousPosting1Id,
                        principalTable: "Schools",
                        principalColumn: "SchoolId");
                    table.ForeignKey(
                        name: "FK_NonTeachingStaffs_Schools_PreviousPosting2Id",
                        column: x => x.PreviousPosting2Id,
                        principalTable: "Schools",
                        principalColumn: "SchoolId");
                    table.ForeignKey(
                        name: "FK_NonTeachingStaffs_Schools_PreviousPosting3Id",
                        column: x => x.PreviousPosting3Id,
                        principalTable: "Schools",
                        principalColumn: "SchoolId");
                    table.ForeignKey(
                        name: "FK_NonTeachingStaffs_Zones_CurrentPostingZoneId",
                        column: x => x.CurrentPostingZoneId,
                        principalTable: "Zones",
                        principalColumn: "ZoneId");
                });

            migrationBuilder.CreateTable(
                name: "StudentClasses",
                columns: table => new
                {
                    StudentClassId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SchoolId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Arm = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentClasses", x => x.StudentClassId);
                    table.ForeignKey(
                        name: "FK_StudentClasses_Schools_SchoolId",
                        column: x => x.SchoolId,
                        principalTable: "Schools",
                        principalColumn: "SchoolId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TeachingStaffs",
                columns: table => new
                {
                    StaffProfileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PublishedWork = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CurrentSubjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OtherSubjects = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MiddleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfilePicture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    StateOfOrigin = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LgaOfOrigin = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Religion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaritalStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AboutMe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Designation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GradeLevel = table.Column<int>(type: "int", nullable: false),
                    FirstAppointment = table.Column<DateTime>(type: "datetime2", nullable: true),
                    YearsInService = table.Column<int>(type: "int", nullable: false),
                    Qualification = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discipline = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentPostingZoneId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CurrentPostingSchoolId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PreviousPosting1Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PreviousPosting2Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PreviousPosting3Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeachingStaffs", x => x.StaffProfileId);
                    table.ForeignKey(
                        name: "FK_TeachingStaffs_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeachingStaffs_Schools_CurrentPostingSchoolId",
                        column: x => x.CurrentPostingSchoolId,
                        principalTable: "Schools",
                        principalColumn: "SchoolId");
                    table.ForeignKey(
                        name: "FK_TeachingStaffs_Schools_PreviousPosting1Id",
                        column: x => x.PreviousPosting1Id,
                        principalTable: "Schools",
                        principalColumn: "SchoolId");
                    table.ForeignKey(
                        name: "FK_TeachingStaffs_Schools_PreviousPosting2Id",
                        column: x => x.PreviousPosting2Id,
                        principalTable: "Schools",
                        principalColumn: "SchoolId");
                    table.ForeignKey(
                        name: "FK_TeachingStaffs_Schools_PreviousPosting3Id",
                        column: x => x.PreviousPosting3Id,
                        principalTable: "Schools",
                        principalColumn: "SchoolId");
                    table.ForeignKey(
                        name: "FK_TeachingStaffs_Subjects_CurrentSubjectId",
                        column: x => x.CurrentSubjectId,
                        principalTable: "Subjects",
                        principalColumn: "SubjectId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeachingStaffs_Zones_CurrentPostingZoneId",
                        column: x => x.CurrentPostingZoneId,
                        principalTable: "Zones",
                        principalColumn: "ZoneId");
                });

            migrationBuilder.CreateTable(
                name: "ClassArms",
                columns: table => new
                {
                    ClassArmId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchoolId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StudentClassId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassArms", x => x.ClassArmId);
                    table.ForeignKey(
                        name: "FK_ClassArms_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "DepartmentId");
                    table.ForeignKey(
                        name: "FK_ClassArms_StudentClasses_StudentClassId",
                        column: x => x.StudentClassId,
                        principalTable: "StudentClasses",
                        principalColumn: "StudentClassId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DocumentFiles",
                columns: table => new
                {
                    DocumenetId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NonTeachingStaffStaffProfileId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TeachingStaffStaffProfileId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentFiles", x => x.DocumenetId);
                    table.ForeignKey(
                        name: "FK_DocumentFiles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DocumentFiles_NonTeachingStaffs_NonTeachingStaffStaffProfileId",
                        column: x => x.NonTeachingStaffStaffProfileId,
                        principalTable: "NonTeachingStaffs",
                        principalColumn: "StaffProfileId");
                    table.ForeignKey(
                        name: "FK_DocumentFiles_TeachingStaffs_TeachingStaffStaffProfileId",
                        column: x => x.TeachingStaffStaffProfileId,
                        principalTable: "TeachingStaffs",
                        principalColumn: "StaffProfileId");
                });

            migrationBuilder.CreateTable(
                name: "FileNameContent",
                columns: table => new
                {
                    FileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DocumentFileDocumenetId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileNameContent", x => x.FileId);
                    table.ForeignKey(
                        name: "FK_FileNameContent_DocumentFiles_DocumentFileDocumenetId",
                        column: x => x.DocumentFileDocumenetId,
                        principalTable: "DocumentFiles",
                        principalColumn: "DocumenetId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserIdentityRole_RolesId",
                table: "ApplicationUserIdentityRole",
                column: "RolesId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ClassArms_DepartmentId",
                table: "ClassArms",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassArms_StudentClassId",
                table: "ClassArms",
                column: "StudentClassId");

            migrationBuilder.CreateIndex(
                name: "IX_Departments_SchoolId",
                table: "Departments",
                column: "SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentFiles_NonTeachingStaffStaffProfileId",
                table: "DocumentFiles",
                column: "NonTeachingStaffStaffProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentFiles_TeachingStaffStaffProfileId",
                table: "DocumentFiles",
                column: "TeachingStaffStaffProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentFiles_UserId",
                table: "DocumentFiles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FileNameContent_DocumentFileDocumenetId",
                table: "FileNameContent",
                column: "DocumentFileDocumenetId");

            migrationBuilder.CreateIndex(
                name: "IX_NonTeachingStaffs_CurrentPostingSchoolId",
                table: "NonTeachingStaffs",
                column: "CurrentPostingSchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_NonTeachingStaffs_CurrentPostingZoneId",
                table: "NonTeachingStaffs",
                column: "CurrentPostingZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_NonTeachingStaffs_PreviousPosting1Id",
                table: "NonTeachingStaffs",
                column: "PreviousPosting1Id");

            migrationBuilder.CreateIndex(
                name: "IX_NonTeachingStaffs_PreviousPosting2Id",
                table: "NonTeachingStaffs",
                column: "PreviousPosting2Id");

            migrationBuilder.CreateIndex(
                name: "IX_NonTeachingStaffs_PreviousPosting3Id",
                table: "NonTeachingStaffs",
                column: "PreviousPosting3Id");

            migrationBuilder.CreateIndex(
                name: "IX_NonTeachingStaffs_UserId",
                table: "NonTeachingStaffs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Organizations_AdminId",
                table: "Organizations",
                column: "AdminId");

            migrationBuilder.CreateIndex(
                name: "IX_Organizations_OrganizationUniqueId",
                table: "Organizations",
                column: "OrganizationUniqueId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Parents_UserId",
                table: "Parents",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Schools_SchoolUniqueId",
                table: "Schools",
                column: "SchoolUniqueId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Schools_ZoneId",
                table: "Schools",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentClasses_SchoolId",
                table: "StudentClasses",
                column: "SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_TeachingStaffs_CurrentPostingSchoolId",
                table: "TeachingStaffs",
                column: "CurrentPostingSchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_TeachingStaffs_CurrentPostingZoneId",
                table: "TeachingStaffs",
                column: "CurrentPostingZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_TeachingStaffs_CurrentSubjectId",
                table: "TeachingStaffs",
                column: "CurrentSubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_TeachingStaffs_PreviousPosting1Id",
                table: "TeachingStaffs",
                column: "PreviousPosting1Id");

            migrationBuilder.CreateIndex(
                name: "IX_TeachingStaffs_PreviousPosting2Id",
                table: "TeachingStaffs",
                column: "PreviousPosting2Id");

            migrationBuilder.CreateIndex(
                name: "IX_TeachingStaffs_PreviousPosting3Id",
                table: "TeachingStaffs",
                column: "PreviousPosting3Id");

            migrationBuilder.CreateIndex(
                name: "IX_TeachingStaffs_UserId",
                table: "TeachingStaffs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Zones_OrganizationId",
                table: "Zones",
                column: "OrganizationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUserIdentityRole");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "ClassArms");

            migrationBuilder.DropTable(
                name: "FileNameContent");

            migrationBuilder.DropTable(
                name: "Parents");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "StudentClasses");

            migrationBuilder.DropTable(
                name: "DocumentFiles");

            migrationBuilder.DropTable(
                name: "NonTeachingStaffs");

            migrationBuilder.DropTable(
                name: "TeachingStaffs");

            migrationBuilder.DropTable(
                name: "Schools");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.DropTable(
                name: "Zones");

            migrationBuilder.DropTable(
                name: "Organizations");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
