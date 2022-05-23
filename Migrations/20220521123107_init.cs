using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Advanced.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UserName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PassWord = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Img = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Nickname = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserName);
                });

            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nickname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactWith = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Last_Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Last_Message_Time = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    server = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contacts_User_ContactWith",
                        column: x => x.ContactWith,
                        principalTable: "User",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Log",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderUserName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ReceiverUserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SentMessage = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Log", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Log_User_SenderUserName",
                        column: x => x.SenderUserName,
                        principalTable: "User",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_ContactWith",
                table: "Contacts",
                column: "ContactWith");

            migrationBuilder.CreateIndex(
                name: "IX_Log_SenderUserName",
                table: "Log",
                column: "SenderUserName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Log");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
