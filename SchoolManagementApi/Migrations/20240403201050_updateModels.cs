using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class updateModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schools_Students_StudentId",
                table: "Schools");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Schools_SchoolId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Schools_StudentId",
                table: "Schools");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Schools");

            migrationBuilder.RenameColumn(
                name: "SchoolId",
                table: "Students",
                newName: "CurrentSchoolId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_SchoolId",
                table: "Students",
                newName: "IX_Students_CurrentSchoolId");

            migrationBuilder.AlterColumn<string>(
                name: "ProfilePicture",
                table: "Students",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "PreviousSchoolsIds",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "ProfilePicture",
                table: "Parents",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Parents",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "Parents",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Parents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RelationshipType",
                table: "Parents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SchoolId",
                table: "Parents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "SchoolId1",
                table: "Parents",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Parents_SchoolId1",
                table: "Parents",
                column: "SchoolId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Parents_Schools_SchoolId1",
                table: "Parents",
                column: "SchoolId1",
                principalTable: "Schools",
                principalColumn: "SchoolId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Schools_CurrentSchoolId",
                table: "Students",
                column: "CurrentSchoolId",
                principalTable: "Schools",
                principalColumn: "SchoolId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parents_Schools_SchoolId1",
                table: "Parents");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Schools_CurrentSchoolId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Parents_SchoolId1",
                table: "Parents");

            migrationBuilder.DropColumn(
                name: "PreviousSchoolsIds",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "Parents");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Parents");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Parents");

            migrationBuilder.DropColumn(
                name: "RelationshipType",
                table: "Parents");

            migrationBuilder.DropColumn(
                name: "SchoolId",
                table: "Parents");

            migrationBuilder.DropColumn(
                name: "SchoolId1",
                table: "Parents");

            migrationBuilder.RenameColumn(
                name: "CurrentSchoolId",
                table: "Students",
                newName: "SchoolId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_CurrentSchoolId",
                table: "Students",
                newName: "IX_Students_SchoolId");

            migrationBuilder.AlterColumn<string>(
                name: "ProfilePicture",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StudentId",
                table: "Schools",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ProfilePicture",
                table: "Parents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Schools_StudentId",
                table: "Schools",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Schools_Students_StudentId",
                table: "Schools",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Schools_SchoolId",
                table: "Students",
                column: "SchoolId",
                principalTable: "Schools",
                principalColumn: "SchoolId");
        }
    }
}
