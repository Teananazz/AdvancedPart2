﻿// <auto-generated />
using Advanced.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Advanced.Migrations
{
    [DbContext(typeof(AdvancedContext))]
    partial class AdvancedContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Advanced.Models.Contacts", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ContactWith")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Last_Message")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Last_Message_Time")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nickname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("server")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ContactWith");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("Advanced.Models.Log", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CreationDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReceiverUserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderUserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("SentMessage")
                        .HasColumnType("bit");

                    b.Property<string>("message")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("SenderUserName");

                    b.ToTable("Log");
                });

            modelBuilder.Entity("Advanced.Models.User", b =>
                {
                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Img")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nickname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PassWord")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserName");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Advanced.Models.Contacts", b =>
                {
                    b.HasOne("Advanced.Models.User", "User")
                        .WithMany("contacts")
                        .HasForeignKey("ContactWith")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Advanced.Models.Log", b =>
                {
                    b.HasOne("Advanced.Models.User", "User")
                        .WithMany("Logs")
                        .HasForeignKey("SenderUserName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Advanced.Models.User", b =>
                {
                    b.Navigation("Logs");

                    b.Navigation("contacts");
                });
#pragma warning restore 612, 618
        }
    }
}
