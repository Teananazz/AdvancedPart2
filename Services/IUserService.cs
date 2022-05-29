using Advanced.Models;

namespace Advanced.Services
{
    public interface IUserService
    {
        public void Create([FromBody] string[] body);
        public Task<IActionResult> Login(string[] body);
        private bool UserExists(string id);
    }
}
