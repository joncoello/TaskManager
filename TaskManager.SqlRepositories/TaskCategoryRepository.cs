using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.DomainModel.Entities;

namespace TaskManager.SqlRepositories
{
    public class TaskCategoryRepository
    {

        private static List<TaskCategory> _categories = new List<TaskCategory>();

        public async Task Create(TaskCategory newTaskCategory)
        {
            _categories.Add(newTaskCategory);
        }

        public async Task<TaskCategory> Get(Guid taskCategoryID)
        {
            return _categories.FirstOrDefault(c => c.TaskCategoryID == taskCategoryID);
        }
    }
}
