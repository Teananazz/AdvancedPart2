using Advanced.Models;

namespace Advanced.Services
{
    public interface IRatingService
    {
        public List<Rating> GetAll();

        public Rating Get(int id);

        public void Create(int id, string name, int rate, string text);

        public void Edit(int id, string name, int rate, string text, DateTime time);

        public void Delete(int id);

        public void UpdateAvg();
    }
}
