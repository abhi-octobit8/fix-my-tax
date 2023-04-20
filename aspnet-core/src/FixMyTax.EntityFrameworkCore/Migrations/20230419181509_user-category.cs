using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FixMyTax.Migrations
{
    public partial class usercategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryProofId",
                table: "AbpUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FMTCategory",
                table: "AbpUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Proofs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Filename = table.Column<string>(type: "text", nullable: true),
                    FileData = table.Column<byte[]>(type: "bytea", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proofs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AbpUsers_CategoryProofId",
                table: "AbpUsers",
                column: "CategoryProofId");

            migrationBuilder.AddForeignKey(
                name: "FK_AbpUsers_Proofs_CategoryProofId",
                table: "AbpUsers",
                column: "CategoryProofId",
                principalTable: "Proofs",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AbpUsers_Proofs_CategoryProofId",
                table: "AbpUsers");

            migrationBuilder.DropTable(
                name: "Proofs");

            migrationBuilder.DropIndex(
                name: "IX_AbpUsers_CategoryProofId",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "CategoryProofId",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "FMTCategory",
                table: "AbpUsers");
        }
    }
}
