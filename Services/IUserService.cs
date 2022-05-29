using Advanced.Models;
using Microsoft.AspNetCore.Mvc;

namespace Advanced.Services
{
    public interface IUserService
    {
        public void Create([FromBody] string[] body);
        public Task<IActionResult> Login(string[] body);
        public bool UserExists(string id);
    }
}
