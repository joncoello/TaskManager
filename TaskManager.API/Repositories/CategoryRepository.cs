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
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Item 1" },
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Item 2" },
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Item 3" }
            };

        public IEnumerable<CategoryItem> All()
        {
            return _categories;
        }

    }
}