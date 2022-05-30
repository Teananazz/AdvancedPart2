using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Linq;
using Advanced.Data;
using Microsoft.EntityFrameworkCore;
using Advanced.Models;
using Advanced.Hubs;
using Microsoft.AspNetCore.SignalR;
using Advanced.Services;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Advanced.Services
{
    public class UserService : IUserService
    {
        private readonly AdvancedContext _context;
        private readonly IConfiguration _configuration;
        private readonly IActionContextAccessor _actionContextAccessor;

        public object ModelState { get; private set; }
        public AdvancedContext GetContext() { return _context; }

        public UserService(AdvancedContext context, IConfiguration configuration, IActionContextAccessor actionContextAccessor)
        {
            _actionContextAccessor = actionContextAccessor;
            _context = context;
            _configuration = configuration;
        }

        public void Create(string[] body)
        {
            User user = new User();
            user.UserName = body[0];
            user.PassWord = body[1];
            user.Img = body[2];
            user.Nickname = body[3];



            try
            {
                if (_actionContextAccessor.ActionContext.ModelState.IsValid)
                {
                    _context.Add(user);
                    // creating contact list
                    _context.SaveChanges();

                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.UserName))
                {
                    return;
                }
                else
                {
                    throw;
                }
            }
            return;
        }

        public async Task<string> Login(string[] body)
        {

            if (body[0] == null || _context.User == null)
            {
                return null;
            }

            var user = await _context.User
                .FirstOrDefaultAsync(m => m.UserName == body[0]);
            if (user == null)
            {
                return null;
            }

            if (user.PassWord == null) { return null; }

            if (user.PassWord.Equals(body[1]))
            {

                // login succesfully - we create secret key  now.

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["JWTParams:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("UserId",body[0])

                };
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTParams:SecretKey"]));
                var mac = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["JWTParams:Issuer"],
                    _configuration["JWTParams:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(20),
                    signingCredentials: mac);

                
                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }

            return null;
        }

        private string Ok(string v)
        {
            return v;
        }

        public bool UserExists(string id)
        {
            return (_context.User?.Any(e => e.UserName == id)).GetValueOrDefault();
        }

    }
}
