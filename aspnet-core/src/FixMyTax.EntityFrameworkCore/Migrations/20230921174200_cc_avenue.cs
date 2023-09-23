using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FixMyTax.Migrations
{
    public partial class cc_avenue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrderId",
                table: "Tickets",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Tickets");
        }
    }
}
