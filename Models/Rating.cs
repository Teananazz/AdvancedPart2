using System.ComponentModel.DataAnnotations;

namespace Advanced.Models
{
    public class Rating
    {
        [Key]
        public int Id { get; set; } = 0;

        [Required]
        public string Name { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rate { get; set; }

        [Required]
        public string Text { get; set; }

        public DateTime Time { get; set; } = DateTime.Now;
    }
}
