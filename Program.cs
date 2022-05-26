using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Advanced.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Advanced.Hubs;
using Microsoft.AspNetCore.Authentication.Certificate;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions()
{
    ApplicationName = typeof(Program).Assembly.FullName,
    ContentRootPath = Directory.GetCurrentDirectory(),
    EnvironmentName = Environments.Staging,
    WebRootPath = "ClientApp" // not wwwroot but clientapp is the origin path.
}) ;

builder.Services.AddDbContext<AdvancedContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AdvancedContext") ?? throw new InvalidOperationException("Connection string 'AdvancedContext' not found.")));

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR();



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
       

        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTParams:SecretKey"]) )
    };

});







builder.Services.AddCors(options =>
{
    options.AddPolicy("Allow All",
        builder =>

            builder.AllowAnyHeader()
                 .AllowAnyMethod()
                 .SetIsOriginAllowed(_ => true)
                 .AllowCredentials()


                ); 


     

});






var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts(); // accessing with https will automatically make it https
}




app.UseCors("Allow All");
app.UseWebSockets();    

app.UseStaticFiles(new StaticFileOptions { RequestPath = "/clientapp/build" });

//app.UseHttpsRedirection();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
//app.UseStaticFiles();
app.UseAuthentication();



app.UseRouting();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/chat"); // Restore this
});

app.MapFallbackToFile("index.html"); ;

app.Run();
