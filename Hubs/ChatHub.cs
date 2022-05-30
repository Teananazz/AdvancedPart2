using Advanced.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Advanced.Hubs
{
    
    public class ChatHub : Hub
    {
        // for example, user name: Teanana has connection ids : 12355
        //private readonly static Dictionary<string, string> _connections =
        //     new Dictionary<string,string>();
     
      

        public async Task AddGroup(string userid)
        {
            

           await Groups.AddToGroupAsync(Context.ConnectionId, userid); // he gets automatically removed when disconnected.
        
        }
        // we add every user to a single group for simplicity.

     
       


    }
}
