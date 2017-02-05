using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskManager.API.Models;

namespace TaskManager.API.Repositories
{
    public class CategoryRepository
    {
        private static IEnumerable<CategoryItem> _categories = new List<CategoryItem>() {
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Urgent" },
                new CategoryItem() { ID = Guid.NewGuid(), Name = "High" },
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Medium" },
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Low" },
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Information" }
            };

        public IEnumerable<CategoryItem> All()
        {
            return _categories;
        }

    }
}