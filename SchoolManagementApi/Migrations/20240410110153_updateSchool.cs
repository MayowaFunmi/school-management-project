using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class updateSchool : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminId",
                table: "Schools",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Schools",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Schools_AdminId",
                table: "Schools",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_Schools_AspNetUsers_AdminId",
                table: "Schools",
                column: "AdminId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schools_AspNetUsers_AdminId",
                table: "Schools");

            migrationBuilder.DropIndex(
                name: "IX_Schools_AdminId",
                table: "Schools");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "Schools");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Schools");
        }
    }
}
