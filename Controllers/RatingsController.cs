using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Advanced.Data;
using Advanced.Models;

namespace Advanced.Controllers
{
    public class RatingsController : Controller
    {
        private readonly IRatingService _service;

        public RatingsController()
        {
            _service = new RatingService();
        }

        // GET: Ratings
        public IActionResult Index()
        {
            return View(_service.GetAll());
        }

        [HttpPost]
        public IActionResult Index(string query)
        {
            List<Rating> list = new List<Rating>();
            if (query != null)
            {
                foreach (var item in _service.GetAll())
                {
                    if (item.Text.Contains(query))
                    {
                        list.Add(item);
                    }
                }
            }
            if (query == null)
            {
                return View(_service.GetAll());
            }

            return View(list);
        }

        // GET: Ratings/Details/5
        public IActionResult Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var rating = _service.Get((int)id);
            if (rating == null)
            {
                return NotFound();
            }

            return View(rating);
        }

        // GET: Ratings/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Ratings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create([Bind("Id,Name,Rate,Text")] Rating rating)
        {
            if (ModelState.IsValid)
            {
                _service.Create(rating.Id, rating.Name, rating.Rate, rating.Text);
                return RedirectToAction(nameof(Index));
            }
            return View(rating);
        }

        // GET: Ratings/Edit/5
        public IActionResult Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var rating = _service.Get((int)id);
            if (rating == null)
            {
                return NotFound();
            }
            return View(rating);
        }

        // POST: Ratings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, [Bind("Id,Name,Rate,Text,Time")] Rating rating)
        {
            if (id != rating.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _service.Edit(rating.Id, rating.Name, rating.Rate, rating.Text, rating.Time);
                }
                catch (DbUpdateConcurrencyException)
                {
                    throw;
                }
                return RedirectToAction(nameof(Index));
            }
            return View(rating);
        }

        // GET: Ratings/Delete/5
        public IActionResult Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var rating = _service.Get((int)id);
            if (rating == null)
            {
                return NotFound();
            }

            return View(rating);
        }

        // POST: Ratings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            var rating = _service.Get((int)id);
            _service.Delete(id);
            return RedirectToAction(nameof(Index));
        }
    }
}
