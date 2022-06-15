using FirebaseAdmin.Messaging;

namespace Advanced.Services
{
    public interface IFirebase
    {
        public Message CreateNotification(string title, string notificationBody, string token);

        public  Task SendNotification(string token, string title, string body);

        public void addUser(string user, string token);

        public void removeUser(string user);


  
        
    }
}
