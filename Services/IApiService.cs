using Advanced.Models;

namespace Advanced.Services
{
    public interface IApiService
    {
        public Task<Object?> GetAllContacts();

        public Task<Object?> GetContact(string id);

        public Task CreateContact([FromBody] string[] friend);

        public Task EditContact(string id, [FromBody] string[] arr);

        public void DeleteContact(string id);
        public async Task<object?> GetAllLogs(string id);
        public async Task CreateMessgae([FromBody] string content, string id);
        public Object? GetFriendMessage(string id, int id2);
        public void Put(string id, int id2, [FromBody] string content);
        public void DeleteMessage(string id, int id2);
        public async Task InvitationFromAnotherServer([FromBody] string[] arguments);
        public async void TransferMessage([FromBody] string[] arguments);
        public string? getTokenName();

    }
}
