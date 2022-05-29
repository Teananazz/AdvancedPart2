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

namespace Advanced.Controllers
{
     [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ApiController : Controller
    {
        private readonly IApiService _service;
        public ApiController(AdvancedContext context, IConfiguration iConfig, IHubContext<ChatHub> hubContext)
        {
           _service = new ApiService(context, iConfig, hubContext);   
        }
      
        [HttpGet("contacts")]
        public  async Task<Object?> GetContacts()
        {
            return _service.GetAll();
        }

        [HttpPost("contacts")]


        public async Task AddContact([FromBody] string[] friend)
        {
            return _service.Create(friend);
        } 
        
        [HttpGet("contacts/{id}")]
        public async Task<Object?> Get(string id)
        {
            return _service.Get(id);
        }



        
        [HttpPut("contacts/{id}")]
        public async Task UpdateContact(string id,[FromBody] string[] arr)
        {
            return _service.Edit(id, arr);

        }



        // TODO : continue from here.

       
        [HttpDelete("contacts/{id}")]
        public async Task Delete(string id)
        {
            return _service.DeleteContact(id);
        }


        [HttpGet("contacts/{id}/messages")]
        public  async Task<Object?> GetLogs(string id)
        {
            return _service.GetAllLogs(id); 
        }

        [HttpPost("contacts/{id}/messages")]

        public   async Task CreateMessage([FromBody] string content, string id)
        {
            return _service.CreateMessgae;
        }

        [HttpGet("contacts/{id}/messages/{id2}")]
        public  Object? GetFriendMessage(string id, int id2)
        {
            return _service.GetFriendMessage;
        }


        [HttpPut("contacts/{id}/messages/{id2}")]
        public void Put(string id, int id2, [FromBody] string content)
        {
            return _service.Put(id, id2, content);
        }




        [HttpDelete("contacts/{id}/messages/{id2}")]
        public void DeleteMessage(string id, int id2)
        {
            return _service.DeleteMessage(id, id2);
        }




        // add contact that added me from another server.
        [AllowAnonymous]
        [HttpPost("invitations")]
        public async Task InvitationFromAnotherServer([FromBody] string[] arguments)
        {
            return _service.InvitationFromAnotherServer(arguments);
        }

        [AllowAnonymous]
        [HttpPost("transfer")]
        public async void TransferMessage([FromBody] string[] arguments)
        {
            return _service.TransferMessage(arguments);
        }
        //[HttpPost]
        //public string[] Post([FromBody] string[] body)
        //{


        //    return body;
        //}
    }
}
