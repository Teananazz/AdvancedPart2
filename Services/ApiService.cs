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
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Advanced.Services
{
    public class ApiService : IApiService
    {
        private readonly AdvancedContext _context;
        private readonly IConfiguration _configuration;
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IActionContextAccessor _actionContextAccessor;
        IHttpContextAccessor accessor; // for token

        public ApiService(IActionContextAccessor ActionAccessor, AdvancedContext _context, IConfiguration _configuration, IHubContext<ChatHub> _hubContext, IHttpContextAccessor accessor)
        {
            this._actionContextAccessor = ActionAccessor;
            this._context = _context;
            this._configuration = _configuration;
            this._hubContext = _hubContext;
            this.accessor = accessor;
        }
        public async Task<Object?> GetAllContacts()
        {
            var name = getTokenName();
          
            var Listing = new List<Object>();

            if (_context.User != null)
            {
                var user = await _context.User
                .FirstOrDefaultAsync(m => m.UserName == name);
                if (user == null || _context.Contacts == null)
                {
                    return null;
                }


                var List = await _context.Contacts.ToListAsync();
                if (List.Any() == false)
                {
                    return null;
                }
                // now we go through the entires
                foreach (var contact in List)
                {
                    if (contact.ContactWith == name)
                    {
                        var Entry = new
                        {
                            id = contact.UserName,
                            name = contact.Nickname,
                            server = contact.server,
                            last = contact.Last_Message,
                            lastdate = contact.Last_Message_Time

                        };



                        Listing.Add(Entry);
                    }

                }

                // var List = await _context.Contacts.Where(m => m.ContactWith.Equals(name));

                return Listing;
            }
            return null;
        }

        public string? getTokenName()
        {
            var identity = accessor?.HttpContext?.User.Identity as ClaimsIdentity;
           
            
          //  var identity = User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                IEnumerable<Claim> claims = identity.Claims;
                // returns the name of the user with authroized token;
                var name = claims.Where(p => p.Type == "UserId").FirstOrDefault()?.Value;
               
                return name;
            }
            return null;
        }

        public async Task<Object?> GetContact(string id)
        {
            var name = getTokenName();

            var Listing = new List<Object>();

            if (_context.User != null)
            {
                var user = await _context.User
                .FirstOrDefaultAsync(m => m.UserName == name);
                if (user == null || _context.Contacts == null)
                {
                    return null;
                }
                var List = await _context.Contacts.ToListAsync();
                if (List.Any() == false)
                {
                    return null;
                }
                // now we go through the entires
                // btw - until now same as GetContacts
                foreach (var contact in List)
                {
                    if (contact.ContactWith == name && contact.UserName == id)
                    {
                        var Entry = new
                        {
                            id = contact.UserName,
                            name = contact.Nickname,
                            server = contact.server,
                            last = contact.Last_Message,
                            lastdate = contact.Last_Message_Time

                        };
                        Listing.Add(Entry);
                    }
                }
                // var List = await _context.Contacts.Where(m => m.ContactWith.Equals(name));
                return Listing.ElementAt(0);
            }
            return null;
        }

       
        public async Task CreateContact([FromBody]string[] friend)
        {
            string name = getTokenName();
            if (name == null)
            {
                return;
            }
            if (friend == null)
            {
                return;

            }
            string UserNameFriend = friend[0];

            string nameFriend = friend[1];
            string server = friend[2];

            var Friend = new Contacts();
            Friend.server = server;
            Friend.Nickname = nameFriend;
            Friend.UserName = UserNameFriend;
            Friend.ContactWith = name;
            if (_actionContextAccessor.ActionContext.ModelState.IsValid)
            {
                try
                {
                    {
                        await _context.AddAsync(Friend);
                        await _context.SaveChangesAsync();

                        // _hubContext.Clients.AllExcept

                    }
                }

                catch (Exception)
                {
                    return;
                }
            }

            return;
        }

        public async Task EditContact(string id, string[] arr)
        {
            var name = getTokenName();

            if (_context.Contacts == null)
            {
                return;
            }
            // there will be only one that is identical in both of them.
            //var contact = _context.Contacts.Where(p => p.ContactWith == name && p.UserName == id).Select(x=>x).ToList();
            var contact = _context.Contacts.Where(p => p.ContactWith == name && p.UserName == id);

            if (contact == null)
            {
                return;
            }

            var result = contact.Select(x => x).ToList();

            if (result.Count == 0 || result == null)
            {
                return;
            }
            var entry = result.ElementAt(0);

            entry.Nickname = arr[0];
            entry.server = arr[1];

            // user.Server = server;

            if (_actionContextAccessor.ActionContext.ModelState.IsValid)
            {
                try
                {
                    _context.Update(entry);
                    await _context.SaveChangesAsync();
                }
                catch (Exception)
                {
                    return;
                }

            }
            return;
        }

        public void DeleteContact(string id)
        {
            var name = getTokenName();

            if (_context.Contacts == null)
            {
                return;
            }
            // there will be only one that is identical in both of them.
            var search = _context.Contacts.Where(p => p.ContactWith == name && p.UserName == id).Select(x => x).ToList();
            if (search == null || search.Count == 0)
            {
                return;
            }
            var contact = search.ElementAt(0);
            if (_actionContextAccessor.ActionContext.ModelState.IsValid)
            {
                try
                {
                    _context.Remove(contact);
                    _context.SaveChanges();
                }
                catch (Exception)
                {
                    return;
                }

            }
            return;
        }

        public async Task<object?> GetAllLogs(string id)
        {
            var name = getTokenName();
           

            if (_context.Log == null || name == null)
            {
                return null;
            }
            try
            {
                var List = await _context.Log.Where(p => p.SenderUserName == name && p.ReceiverUserName == id && p.SentMessage == false || p.SenderUserName == id && p.ReceiverUserName == name && p.SentMessage == true).Select(x => x).ToListAsync();
               
                return List;
            }
            catch (ArgumentNullException)
            {
                Console.WriteLine("Error");
                return null;
            }

        }
        public async Task CreateMessgae(string content, string id)
        {
            var name = getTokenName();
            if (name == null)
            {
                return;
            }

            // first we find the contact so we can update most recent message.

            //var Listing = new List<Object>();
            var Date = DateTime.UtcNow.ToString();
            var ContactPair = _context.Contacts.Where(p => p.UserName == id && p.ContactWith == name).Select(x=> x).ToList();
            foreach (var contact in ContactPair)
            {
                contact.Last_Message = content;
                contact.Last_Message_Time = Date;


            }
        


            Log LogEntry = new Log();
            LogEntry.message = content;
            LogEntry.SenderUserName = name;
            LogEntry.ReceiverUserName = id;
            LogEntry.CreationDate = Date;
            LogEntry.SentMessage = false;
            if (_actionContextAccessor.ActionContext.ModelState.IsValid)
            {
                try
                {
                     _context.Add(LogEntry);
                    _context.Update((Contacts)ContactPair.ElementAt(0));
                  //  _context.Update(ContactPair.ElementAt(1));
                //    _context.Update(UpdatedContact);
                    _context.SaveChanges();


                    // now we broadcast message 
                   

                  //  await _hubContext.Clients.All.SendAsync("getMessage");
                }
                catch (Exception)
                {
                    Console.WriteLine("Failure tO Create");
                    throw;
                }

            }
        }
        public  Object? GetFriendMessage(string id, int id2)
        {
            var name = getTokenName();

            if (_context.Log == null)
            {
                return null;
            }

            var message = _context.Log.Where(p => p.SenderUserName == id && p.ReceiverUserName == name && p.Id == id2).Select(x => x).ToList();


            //return id;
            return message.ElementAt(0);
        }

        public void Put(string id, int id2, [FromBody] string content)
        {
            var name = getTokenName();

            if (_context.Log == null)
            {
                return;
            }

            var messageLogs = _context.Log.Where(p => p.SenderUserName == id && p.ReceiverUserName == name && p.Id == id2).Select(x => x).ToArray();
            var Message = messageLogs.ElementAt(0); // List of only length one because id must be unique.

            Message.message = content;

            if (_actionContextAccessor.ActionContext.ModelState.IsValid)
            {
                try
                {
                    _context.Update(Message);
                    _context.SaveChanges();
                }
                catch (Exception)
                {
                    return;
                }

            }

            return;
        }

        public void DeleteMessage(string id, int id2)
        {
            var name = getTokenName();

            if (_context.Log == null)
            {
                return;
            }

            var messageLogs = _context.Log.Where(p => p.SenderUserName == id && p.ReceiverUserName == name && p.Id == id2).Select(x => x).ToArray();
            var Message = messageLogs.ElementAt(0); // List of only length one because id must be unique.



            if (_actionContextAccessor.ActionContext.ModelState.IsValid)
            {
                try
                {
                    _context.Remove(Message);
                    _context.SaveChanges();
                }
                catch (Exception)
                {
                    return;
                }

            }

            return;
        }
        public async Task InvitationFromAnotherServer(string[] arguments)
        {
            if (arguments == null || arguments.Length != 3)
            {
                return;
            }

            var from = arguments[0];
            var to = arguments[1];
            var server = arguments[2];



            Contacts contact = new Contacts();
            contact.server = server;
            contact.ContactWith = to;
            contact.UserName = from;
            contact.Nickname = from;


            if (_actionContextAccessor.ActionContext.ModelState.IsValid)
            {
                try
                {
                    _context.Add(contact);
                     _context.SaveChanges();
                   // await _hubContext.Clients.All.SendAsync("ReceivedContact");

                    // TODO: need to test this.
                     await _hubContext.Clients.Groups(to).SendAsync("ReceivedContact");


                }
                catch (Exception)
                {
                    return;
                }

            }
        }
        public async void TransferMessage(string[] arguments)
        {
            Console.WriteLine("Got Here : " + arguments[0]);
            var from = arguments[0];
            var to = arguments[1];
            var message = arguments[2];

            var Date = DateTime.UtcNow.ToString();
            var ContactPair = _context.Contacts.Where(p => p.UserName == to && p.ContactWith == from).Select(x => x).ToList();
            foreach (var contact in ContactPair)
            {
                contact.Last_Message = message;
                contact.Last_Message_Time = Date;


            }



            Log LogEntry = new Log();
            LogEntry.SenderUserName = from;
            LogEntry.ReceiverUserName = to;
            LogEntry.CreationDate = Date;
            LogEntry.message = message;
            LogEntry.SentMessage = true;
            if(_actionContextAccessor.ActionContext != null)
            {
                if (_actionContextAccessor.ActionContext.ModelState.IsValid)
                {
                    try
                    {
                         _context.Add(LogEntry);
                        _context.Update((Contacts)ContactPair.ElementAt(0));
                        _context.SaveChanges();
                        // await _hubContext.Clients.All.SendAsync("getMessage");

                        // TODO : need to test this.

                        await _hubContext.Clients.Groups(to).SendAsync("getMessage");
                    }
                    catch (Exception)
                    {
                        return;
                    }

                }
            }
            
        }
    }
}
