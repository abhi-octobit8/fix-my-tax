using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FixMyTax.Migrations
{
    public partial class userpropertyadd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdharNumber",
                table: "AbpUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GSTNumber",
                table: "AbpUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PanCardNumber",
                table: "AbpUsers",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdharNumber",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "GSTNumber",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "PanCardNumber",
                table: "AbpUsers");
        }
    }
}
