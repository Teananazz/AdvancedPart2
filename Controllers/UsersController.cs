﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Advanced.Data;
using Advanced.Models;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace Advanced.Controllers
{
     [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly AdvancedContext _context;
        private readonly IConfiguration _configuration;
        public UsersController(AdvancedContext context, IConfiguration iConfig)
        {
            _context = context;
            _configuration = iConfig;   
        }


       







        
        [HttpGet]
       public Object?  Index()
        {
            if(_context.User == null)
            {
                return null;
            }
            var list = _context.User.ToList();
                if(list == null)
            {
                return null;
            }
            return list;

         }

 


        //// GET: Users/3
        //[HttpGet("3")]
        //public async Task<IActionResult> Edit(string id)
        //{
        //    if (id == null || _context.User == null)
        //    {
        //        return NotFound();
        //    }

        //    var user = await _context.User.FindAsync(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }
        //    return View(user);
        //}



        //// GET: Users/4
        //[HttpGet("4")]
        //public async Task<IActionResult> Delete(string id)
        //{
        //    if (id == null || _context.User == null)
        //    {
        //        return NotFound();
        //    }

        //    var user = await _context.User
        //        .FirstOrDefaultAsync(m => m.UserName == id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(user);
        //}




        // POST: Users/1

        [HttpPost("1")]
        
        public void Create([FromBody] string[] body)
        {

            User user = new();
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

        //// POST: Users/2
        //// To protect from overposting attacks, enable the specific properties you want to bind to.
        //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost("2")]
       
        //public async Task<IActionResult> Edit(string id, [Bind("UserName,PassWord,Img,Nickname")] User user)
        //{
        //    if (id != user.UserName)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update(user);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!UserExists(user.UserName))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(user);
        //}


        // POST: Users/Login
        // body[0] is user name, body[1] is password.
        
        [HttpPost("Login")]
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

            if(user.PassWord == null) { return new EmptyResult(); }

            if(user.PassWord.Equals(body[1])) {

                // login succesfully - we create secret key  now.

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["JWTParams:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("UserId",body[0]) 

                };
                var secretKey= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTParams:SecretKey"]));
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

        //// GET: Users/Details
        //[HttpPost("Details")]
        //public async Task<User?> Details([FromBody] string id)
        //{

        //    if (id == null || _context.User == null)
        //    {
        //        return null;
        //    }

        //    var user = await _context.User
        //        .FirstOrDefaultAsync(m => m.UserName == id);
        //    if (user == null)
        //    {
                
        //        return null;
        //    }

        //    return user;
        //}

        //[HttpPost("10")]

        //public async Task<Boolean> AddContact([FromBody] string name)
        //{
        //    if( name == null || _context.User == null)
        //    {
        //        return false;
        //    }

        //    var user = await _context.User
        //        .FirstOrDefaultAsync(m => m.UserName == name);
        //    if( user == null)
        //    {
        //        return false;
        //    }


        //    // Contact contact = new Contact();
        //    //contact.UserList.Add(user);
            


        //    return true;


        //}


        //// POST: Users/Delete ( not sure)
        //[HttpPost, ActionName("Delete")]
 
        //public async Task<IActionResult> DeleteConfirmed(string id)
        //{
        //    if (_context.User == null)
        //    {
        //        return Problem("Entity set 'AdvancedContext.User'  is null.");
        //    }
        //    var user = await _context.User.FindAsync(id);
        //    if (user != null)
        //    {
        //        _context.User.Remove(user);
        //    }
            
        //    await _context.SaveChangesAsync();
        //    return RedirectToAction(nameof(Index));
        //}




        private bool UserExists(string id)
        {
          return (_context.User?.Any(e => e.UserName == id)).GetValueOrDefault();
        }
    }
}
