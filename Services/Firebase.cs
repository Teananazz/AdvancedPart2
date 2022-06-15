namespace Advanced.Services
{
    using FirebaseAdmin;
    using FirebaseAdmin.Messaging;
    using Google.Apis.Auth.OAuth2;


    public class Firebase :IFirebase
    {

        private readonly FirebaseMessaging messaging;
        public static Dictionary<string, string> Token_User_pairs;

        public Firebase()
        {
            var app = FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.GetApplicationDefault(),
            });
            messaging = FirebaseMessaging.GetMessaging(app);
            Token_User_pairs = new Dictionary<string, string>();
        }


       public Message CreateNotification(string title, string notificationBody, string token)
        {
            return new Message()
            {
                Token = token,
                Notification = new Notification()
                {
                    Body = notificationBody,
                    Title = title
                }
            };
        }

        public async Task SendNotification(string token, string title, string body)
        {
            var result = await messaging.SendAsync(CreateNotification(title, body, token));
            //do something with result
        }

        public void addUser( string user, string token )
        {
            if(Token_User_pairs.ContainsKey(user))
            {
                Token_User_pairs[user] = token;

            }
          
            else
            {
                Token_User_pairs.Add(user, token);
            }
           

        }

        public void removeUser(string user)
        {
            if (Token_User_pairs.ContainsKey(user))
            {
                Token_User_pairs.Remove(user);
            }

            // if exists in the list we can delete him.
            else
            {
                return;
            }
            
        }
        public static Dictionary<string, string> getPairs()
        {
            return Token_User_pairs;
        }
    }
}
