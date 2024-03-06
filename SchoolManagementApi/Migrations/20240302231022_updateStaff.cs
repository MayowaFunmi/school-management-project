using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class updateStaff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NonTeachingStaffs_Schools_PreviousPosting1Id",
                table: "NonTeachingStaffs");

            migrationBuilder.DropForeignKey(
                name: "FK_NonTeachingStaffs_Schools_PreviousPosting2Id",
                table: "NonTeachingStaffs");

            migrationBuilder.DropForeignKey(
                name: "FK_NonTeachingStaffs_Schools_PreviousPosting3Id",
                table: "NonTeachingStaffs");

            migrationBuilder.DropForeignKey(
                name: "FK_TeachingStaffs_Schools_PreviousPosting1Id",
                table: "TeachingStaffs");

            migrationBuilder.DropForeignKey(
                name: "FK_TeachingStaffs_Schools_PreviousPosting2Id",
                table: "TeachingStaffs");

            migrationBuilder.DropForeignKey(
                name: "FK_TeachingStaffs_Schools_PreviousPosting3Id",
                table: "TeachingStaffs");

            migrationBuilder.DropIndex(
                name: "IX_TeachingStaffs_PreviousPosting1Id",
                table: "TeachingStaffs");

            migrationBuilder.DropIndex(
                name: "IX_TeachingStaffs_PreviousPosting2Id",
                table: "TeachingStaffs");

            migrationBuilder.DropIndex(
                name: "IX_TeachingStaffs_PreviousPosting3Id",
                table: "TeachingStaffs");

            migrationBuilder.DropIndex(
                name: "IX_NonTeachingStaffs_PreviousPosting1Id",
                table: "NonTeachingStaffs");

            migrationBuilder.DropIndex(
                name: "IX_NonTeachingStaffs_PreviousPosting2Id",
                table: "NonTeachingStaffs");

            migrationBuilder.DropIndex(
                name: "IX_NonTeachingStaffs_PreviousPosting3Id",
                table: "NonTeachingStaffs");

            migrationBuilder.DropColumn(
                name: "PreviousPosting1Id",
                table: "TeachingStaffs");

            migrationBuilder.DropColumn(
                name: "PreviousPosting2Id",
                table: "TeachingStaffs");

            migrationBuilder.DropColumn(
                name: "PreviousPosting3Id",
                table: "TeachingStaffs");

            migrationBuilder.DropColumn(
                name: "PreviousPosting1Id",
                table: "NonTeachingStaffs");

            migrationBuilder.DropColumn(
                name: "PreviousPosting2Id",
                table: "NonTeachingStaffs");

            migrationBuilder.DropColumn(
                name: "PreviousPosting3Id",
                table: "NonTeachingStaffs");

            migrationBuilder.AddColumn<string>(
                name: "PreviousSchoolsIds",
                table: "TeachingStaffs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreviousSchoolsIds",
                table: "NonTeachingStaffs",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreviousSchoolsIds",
                table: "TeachingStaffs");

            migrationBuilder.DropColumn(
                name: "PreviousSchoolsIds",
                table: "NonTeachingStaffs");

            migrationBuilder.AddColumn<Guid>(
                name: "PreviousPosting1Id",
                table: "TeachingStaffs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PreviousPosting2Id",
                table: "TeachingStaffs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PreviousPosting3Id",
                table: "TeachingStaffs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PreviousPosting1Id",
                table: "NonTeachingStaffs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PreviousPosting2Id",
                table: "NonTeachingStaffs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PreviousPosting3Id",
                table: "NonTeachingStaffs",
                type: "uniqueidentifier",
                nullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_NonTeachingStaffs_Schools_PreviousPosting1Id",
                table: "NonTeachingStaffs",
                column: "PreviousPosting1Id",
                principalTable: "Schools",
                principalColumn: "SchoolId");

            migrationBuilder.AddForeignKey(
                name: "FK_NonTeachingStaffs_Schools_PreviousPosting2Id",
                table: "NonTeachingStaffs",
                column: "PreviousPosting2Id",
                principalTable: "Schools",
                principalColumn: "SchoolId");

            migrationBuilder.AddForeignKey(
                name: "FK_NonTeachingStaffs_Schools_PreviousPosting3Id",
                table: "NonTeachingStaffs",
                column: "PreviousPosting3Id",
                principalTable: "Schools",
                principalColumn: "SchoolId");

            migrationBuilder.AddForeignKey(
                name: "FK_TeachingStaffs_Schools_PreviousPosting1Id",
                table: "TeachingStaffs",
                column: "PreviousPosting1Id",
                principalTable: "Schools",
                principalColumn: "SchoolId");

            migrationBuilder.AddForeignKey(
                name: "FK_TeachingStaffs_Schools_PreviousPosting2Id",
                table: "TeachingStaffs",
                column: "PreviousPosting2Id",
                principalTable: "Schools",
                principalColumn: "SchoolId");

            migrationBuilder.AddForeignKey(
                name: "FK_TeachingStaffs_Schools_PreviousPosting3Id",
                table: "TeachingStaffs",
                column: "PreviousPosting3Id",
                principalTable: "Schools",
                principalColumn: "SchoolId");
        }
    }
}
