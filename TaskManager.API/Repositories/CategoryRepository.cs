using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskManager.API.Models;

namespace TaskManager.API.Repositories
{
    public class CategoryRepository
    {

        private static string body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        private static IEnumerable<CategoryItem> _categories = new List<CategoryItem>() {
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Item 1", Body = body },
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Item 2", Body = body },
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Item 3", Body = body }
            };

        public IEnumerable<CategoryItem> All()
        {
            return _categories;
        }

    }
}