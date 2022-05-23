using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Advanced.Models
{
    public class Contacts
    {


      
        public int Id { get; set; }

       
       
        public string UserName { get; set; } = string.Empty;


        public string Nickname { get; set; } = string.Empty;

        // Foreign keys for user


        // ContactWith helps us identitfy which user we are looking at his contact.
        [ForeignKey("User")]
        public string ContactWith { get; set; }

        public virtual User User { get; set; }   

        public string Last_Message { get; set; } = string.Empty;

        public string Last_Message_Time { get; set; } = string.Empty;

        public string server { get; set; } = string.Empty;

    }
}
