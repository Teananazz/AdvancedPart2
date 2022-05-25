using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Advanced.Hubs
{
    //[Authorize]
    public class ChatHub : Hub
    {
        public async Task SendMessage(string userid, string token)
        {
           
            await Clients.All.SendAsync("ReceiveMessage", Context.ConnectionId);

        }
    }
}
