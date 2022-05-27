using Advanced.Models;

namespace Advanced.Services
{
    public class RatingService : IRatingService
    {
        public static List<Rating> ratings = new List<Rating>();
        public static double avg;

        public void UpdateAvg()
        {
            int sum = 0;
            int count = 0;
            foreach (var rating in ratings)
            {
                sum += rating.Rate;
                count++;
            }
            avg = sum / count;
        }

        public void Create(int id, string name, int rate, string text)
        {
            Rating rating = new Rating
            {
                Id = id,
                Name = name,
                Rate = rate,
                Text = text,
                Time = DateTime.Now,
            };
            if (ratings.Find(x => x.Id == id) != null)
            {
                int nextId = ratings.Max(x => x.Id) + 1;
                rating.Id = nextId;
            }
            ratings.Add(rating);
            UpdateAvg();
        }

        public void Delete(int id)
        {
            ratings.Remove(Get(id));
            UpdateAvg();
        }

        public void Edit(int id, string name, int rate, string text, DateTime time)
        {
            Rating rating = Get(id);
            rating.Name = name;
            rating.Rate = rate;
            rating.Text = text;
            rating.Time = time;
            UpdateAvg();
        }

        public Rating Get(int id)
        {
            return ratings.Find(x => x.Id == id);
        }

        public double GetAvg()
        {
            return avg;
        }

        public List<Rating> GetAll()
        {
            return ratings;
        }
    }
}
