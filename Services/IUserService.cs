﻿using Advanced.Data;
using Advanced.Models;
using Microsoft.AspNetCore.Mvc;

namespace Advanced.Services
{
    public interface IUserService
    {
        public AdvancedContext GetContext();
        public void Create([FromBody] string[] body);
        public Task<string> Login(string[] body);
        public bool UserExists(string id);
    }
}
