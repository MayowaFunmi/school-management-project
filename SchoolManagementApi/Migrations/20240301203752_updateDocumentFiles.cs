using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class updateDocumentFiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FileNameContent");

            migrationBuilder.AddColumn<string>(
                name: "FilesUrls",
                table: "DocumentFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilesUrls",
                table: "DocumentFiles");

            migrationBuilder.CreateTable(
                name: "FileNameContent",
                columns: table => new
                {
                    FileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocumentFileDocumenetId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                name: "IX_FileNameContent_DocumentFileDocumenetId",
                table: "FileNameContent",
                column: "DocumentFileDocumenetId");
        }
    }
}
