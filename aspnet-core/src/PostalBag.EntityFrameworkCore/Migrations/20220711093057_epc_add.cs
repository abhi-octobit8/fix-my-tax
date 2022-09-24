using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PostalBag.Migrations
{
    public partial class epc_add : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EpcNumber",
                table: "Bags",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Bag_EpcNumber",
                table: "Bags",
                column: "EpcNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EpcNumber",
                table: "Bags");
        }
    }
}
