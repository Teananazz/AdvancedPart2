using Advanced.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Advanced.Hubs
{
    
    public class ChatHub : Hub
    {
        // for example, user name: Teanana has connection ids : 12355
        private readonly static Dictionary<string, string> _connections =
             new Dictionary<string,string>();

     
        public async Task SendMessage(string userid, string token)
        {

       
            await Clients.All.SendAsync("ReceiveMessage", Context.ConnectionId);
            

        }
        // in this function, we already have the information o the serve
        public async Task AddGroup(string username)
        {


            


            

        }

        public Object GetConnectionID()
        {
            return _connections;
         }
    }
}
