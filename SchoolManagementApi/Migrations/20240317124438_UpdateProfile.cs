using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrganizationUniqueId",
                table: "TeachingStaffs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Step",
                table: "TeachingStaffs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "OrganizationUniqueId",
                table: "NonTeachingStaffs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Step",
                table: "NonTeachingStaffs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrganizationUniqueId",
                table: "TeachingStaffs");

            migrationBuilder.DropColumn(
                name: "Step",
                table: "TeachingStaffs");

            migrationBuilder.DropColumn(
                name: "OrganizationUniqueId",
                table: "NonTeachingStaffs");

            migrationBuilder.DropColumn(
                name: "Step",
                table: "NonTeachingStaffs");
        }
    }
}
