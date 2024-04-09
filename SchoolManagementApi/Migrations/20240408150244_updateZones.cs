using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class updateZones : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schools_Zones_ZoneId",
                table: "Schools");

            migrationBuilder.AddColumn<string>(
                name: "AdminId",
                table: "Zones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Zones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Schools_Zones_ZoneId",
                table: "Schools",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "ZoneId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schools_Zones_ZoneId",
                table: "Schools");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "Zones");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Zones");

            migrationBuilder.AddForeignKey(
                name: "FK_Schools_Zones_ZoneId",
                table: "Schools",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "ZoneId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
