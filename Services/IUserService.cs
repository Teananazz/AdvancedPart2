using Advanced.Models;

namespace Advanced.Services
{
    public interface IUserService
    {
        public void Create([FromBody] string[] body);
        public async Task<IActionResult> Login([FromBody] string[] body);
        private bool UserExists(string id);
    }
}
