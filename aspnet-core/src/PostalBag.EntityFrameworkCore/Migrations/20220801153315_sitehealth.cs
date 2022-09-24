using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PostalBag.Migrations
{
    public partial class readerstate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReaderState",
                table: "Sites",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReaderState",
                table: "Sites");
        }
    }
}
