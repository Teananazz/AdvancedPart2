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


namespace Advanced.Services
{
    public class UserService : IUserService
    {
        private readonly AdvancedContext _context;
        private readonly IConfiguration _configuration;

        public UserService(AdvancedContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public void Create([FromBody] string[] body)
        {
            User user = new User();
            user.UserName = body[0];
            user.PassWord = body[1];
            user.Img = body[2];
            user.Nickname = body[3];



            try
            {
                if (ModelState.IsValid)
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

        public async Task<IActionResult> Login([FromBody] string[] body)
        {

            if (body[0] == null || _context.User == null)
            {
                return new EmptyResult();
            }

            var user = await _context.User
                .FirstOrDefaultAsync(m => m.UserName == body[0]);
            if (user == null)
            {
                return new EmptyResult();
            }

            if (user.PassWord == null) { return new EmptyResult(); }

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

            return new EmptyResult();
        }

            private bool UserExists(string id)
        {
            return (_context.User?.Any(e => e.UserName == id)).GetValueOrDefault();
        }

    }
}
