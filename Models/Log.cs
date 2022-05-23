using System.ComponentModel.DataAnnotations.Schema;

namespace Advanced.Models
{
    public class Log
    {

        
        public int Id { get; set; }


        [ForeignKey("User")] // indicates who the log belongs to
      
        public string SenderUserName { get; set; } = string.Empty;

     
    
        public string ReceiverUserName { get; set; } = string.Empty;

        public string message { get; set; } = string.Empty;

        public virtual User User { get; set; }
        public string CreationDate { get;  set; } = string.Empty;   

        public Boolean SentMessage { get; set; }
    }
}
