﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Linq;
using Advanced.Data;
using Microsoft.EntityFrameworkCore;
using Advanced.Models;
using Advanced.Hubs;
using Microsoft.AspNetCore.SignalR;
using Advanced.Services;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Advanced.Controllers
{
     [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ApiController : Controller
    {
        private readonly IApiService _service;
        
        public ApiController(IActionContextAccessor ActionAccessor, AdvancedContext context, IConfiguration iConfig, IHubContext<ChatHub> hubContext, IHttpContextAccessor accessor)
        {
           _service = new ApiService(ActionAccessor, context, iConfig, hubContext, accessor);   
        }

      
        [HttpGet("contacts")]
        public async Task<Object?> GetContacts()
        {
          
            return await _service.GetAllContacts();
        }

        [HttpPost("contacts")]


        public Task AddContact([FromBody] string[] friend)
        {
            return _service.CreateContact(friend);
        } 
        
        [HttpGet("contacts/{id}")]
        public async Task<Object?> Get(string id)
        {
            return await _service.GetContact(id);
        }



        
        [HttpPut("contacts/{id}")]
        public async Task UpdateContact(string id,[FromBody] string[] arr)
        {
             await _service.EditContact(id, arr);
           

        }



        // TODO : continue from here.

       
        [HttpDelete("contacts/{id}")]
        public void Delete(string id)
        {
            _service.DeleteContact(id);
        }


        [HttpGet("contacts/{id}/messages")]
        public  async Task<Object?> GetLogs(string id)
        {
           
            return await _service.GetAllLogs(id); 
        }

        [HttpPost("contacts/{id}/messages")]

        public async Task CreateMessage([FromBody] string content, string id)
        {
            await _service.CreateMessgae(content, id);
        }

        [HttpGet("contacts/{id}/messages/{id2}")]
        public  Object? GetFriendMessage(string id, int id2)
        {
            return  _service.GetFriendMessage(id, id2);
        }


        [HttpPut("contacts/{id}/messages/{id2}")]
        public void Put(string id, int id2, [FromBody] string content)
        {
            _service.Put(id, id2, content);
        }




        [HttpDelete("contacts/{id}/messages/{id2}")]
        public void DeleteMessage(string id, int id2)
        {
            _service.DeleteMessage(id, id2);
        }




        // add contact that added me from another server.
        [AllowAnonymous]
        [HttpPost("invitations")]
        public Task InvitationFromAnotherServer([FromBody] string[] arguments)
        {
            return _service.InvitationFromAnotherServer(arguments);
        }

        [AllowAnonymous]
        [HttpPost("transfer")]
        public void TransferMessage([FromBody] string[] arguments)
        {
             _service.TransferMessage(arguments);
        }
        //[HttpPost]
        //public string[] Post([FromBody] string[] body)
        //{


        //    return body;
        //}
    }
}
