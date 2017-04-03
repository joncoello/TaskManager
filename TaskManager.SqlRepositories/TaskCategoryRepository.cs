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
            newTaskCategory.TaskCategoryID = Guid.NewGuid();
            _categories.Add(newTaskCategory);
        }

        public async Task<TaskCategory> Get(Guid taskCategoryID)
        {
            return _categories.FirstOrDefault(c => c.TaskCategoryID == taskCategoryID);
        }

        public async Task<List<TaskCategory>> GetAll(Guid taskCategoryID)
        {
            return _categories;
        }

        public void Update(TaskCategory taskCategory)
        {
            var taskCatgoryToUpdate = _categories.FirstOrDefault(tc => tc.TaskCategoryID == taskCategory.TaskCategoryID);
            if (taskCatgoryToUpdate != null)
            {
                taskCatgoryToUpdate.TaskCategoryName = taskCategory.TaskCategoryName;
            }
        }

        public void Delete(Guid taskCategoryID)
        {
            var taskCategoryToRemove = _categories.FirstOrDefault(tc => tc.TaskCategoryID == taskCategoryID);
            if (taskCategoryToRemove != null)
            {
                _categories.Remove(taskCategoryToRemove);
            }
        }
    }
}
