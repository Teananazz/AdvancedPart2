using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Advanced.Models
{
   
    public class User
    {


        [Key]
        public string UserName { get; set; } = string.Empty;    


        public string? PassWord { get; set; }    

        public string? Img { get; set; }

        public string? Nickname { get; set; }


  
        public virtual List<Contacts> contacts { get; set; }

      
        public virtual List<Log> Logs  {get; set; }
       
    }
}
