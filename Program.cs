using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Advanced.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AdvancedContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AdvancedContext") ?? throw new InvalidOperationException("Connection string 'AdvancedContext' not found.")));

// Add services to the container.

builder.Services.AddControllersWithViews();


builder.Services.AddAuthentication(x=>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = false,
        ValidateAudience = false,
        //ValidAudience = builder.Configuration["JWTParams:Audience"],
        //ValidIssuer = builder.Configuration["JWTParams:Issuer"],

        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTParams:SecretKey"]) )
    };

});





builder.Services.AddCors(options =>
{
    options.AddPolicy("Allow All",
        builder =>
        {
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();

        }
        );

});




var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}







app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();


app.UseCors("Allow All");
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
