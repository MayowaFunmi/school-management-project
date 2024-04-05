using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class modelUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parents_Schools_SchoolId1",
                table: "Parents");

            migrationBuilder.RenameColumn(
                name: "SchoolId1",
                table: "Parents",
                newName: "StudentSchoolId");

            migrationBuilder.RenameColumn(
                name: "SchoolId",
                table: "Parents",
                newName: "OrganizationUniqueId");

            migrationBuilder.RenameIndex(
                name: "IX_Parents_SchoolId1",
                table: "Parents",
                newName: "IX_Parents_StudentSchoolId");

            migrationBuilder.AddColumn<string>(
                name: "OrganizationUniqueId",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "SchoolZoneId",
                table: "Students",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Students_SchoolZoneId",
                table: "Students",
                column: "SchoolZoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Parents_Schools_StudentSchoolId",
                table: "Parents",
                column: "StudentSchoolId",
                principalTable: "Schools",
                principalColumn: "SchoolId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Zones_SchoolZoneId",
                table: "Students",
                column: "SchoolZoneId",
                principalTable: "Zones",
                principalColumn: "ZoneId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parents_Schools_StudentSchoolId",
                table: "Parents");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Zones_SchoolZoneId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_SchoolZoneId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "OrganizationUniqueId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "SchoolZoneId",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "StudentSchoolId",
                table: "Parents",
                newName: "SchoolId1");

            migrationBuilder.RenameColumn(
                name: "OrganizationUniqueId",
                table: "Parents",
                newName: "SchoolId");

            migrationBuilder.RenameIndex(
                name: "IX_Parents_StudentSchoolId",
                table: "Parents",
                newName: "IX_Parents_SchoolId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Parents_Schools_SchoolId1",
                table: "Parents",
                column: "SchoolId1",
                principalTable: "Schools",
                principalColumn: "SchoolId");
        }
    }
}
