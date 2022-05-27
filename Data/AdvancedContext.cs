using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Advanced.Models;
using Microsoft.EntityFrameworkCore;



namespace Advanced.Data
{
    public class AdvancedContext : DbContext
    {
      

        public AdvancedContext (DbContextOptions<AdvancedContext> options)
            : base(options)
        {
        }

        public DbSet<Advanced.Models.User>? User { get; set; }

        public DbSet<Advanced.Models.Contacts>? Contacts { get; set; }  

        public DbSet<Advanced.Models.Log>? Log {get; set; }

        public DbSet<Advanced.Models.Rating>? Rating { get; set; }

      
    

    }


}



