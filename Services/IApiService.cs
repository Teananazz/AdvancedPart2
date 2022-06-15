using Advanced.Models;

namespace Advanced.Services
{
    public interface IApiService
    {
        public Task<Object?> GetAllContacts();

        public Task<Object?> GetContact(string id);

        public Task CreateContact(string[] friend);

        public Task EditContact(string id,string[] arr);

        public void DeleteContact(string id);
        public Task<object?> GetAllLogs(string id);
        public Task CreateMessgae(string content, string id);
        public Object? GetFriendMessage(string id, int id2);
        public void Put(string id, int id2,string content);
        public void DeleteMessage(string id, int id2);
        public Task InvitationFromAnotherServer(string[] arguments);
        public void TransferMessage(string[] arguments);
        public string? getTokenName();

        public void addToFireBase(string user, string token);

        public void removeUser(string user);
       

    }
}
