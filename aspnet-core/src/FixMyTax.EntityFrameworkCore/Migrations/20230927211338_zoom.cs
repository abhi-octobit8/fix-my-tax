using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FixMyTax.Migrations
{
    public partial class zoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<string>(
                name: "ZoomJoinUrl",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZoomMeetingId",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZoomMeetingPasscode",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZoomTime",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZoomTopic",
                table: "Tickets",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ZoomJoinUrl",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "ZoomMeetingId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "ZoomMeetingPasscode",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "ZoomTime",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "ZoomTopic",
                table: "Tickets");
        }
    }
}
