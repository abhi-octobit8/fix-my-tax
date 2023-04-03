using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FixMyTax.Migrations
{
    public partial class assignedby : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignmentByUserId",
                table: "Tickets",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssignmentByUserId",
                table: "Tickets");
        }
    }
}
