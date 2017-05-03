using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.DomainModel.Entities;
using TaskManager.DomainModel.Repositories;
using TaskManager.SqlRepositories;

namespace TaskManager.SqlRepositories
{
    public class TaskCategoryRepository : ITaskCategoryRepository
    {
        private readonly ISQLClient _sqlClient;

        public TaskCategoryRepository(ISQLClient sqlClient)
        {
            _sqlClient = sqlClient;
        }
        
        public async Task Create(TaskCategory newTaskCategory)
        {
            newTaskCategory.TaskCategoryID = Guid.NewGuid();
            await _sqlClient.RunSp("Task.TaskCategory_Insert", new {
                TaskCategoryID = newTaskCategory.TaskCategoryID,
                CategoryName = newTaskCategory.CategoryName
            });
        }

        public async Task<TaskCategory> Get(Guid taskCategoryID)
        {
            var result = await _sqlClient.RunSpReturnGraph<TaskCategory>("Task.TaskCategory_Get", new {
                TaskCategoryID = taskCategoryID
            });
            return result.ToList()[0];
        }

        public async Task<IEnumerable<TaskCategory>> GetAll()
        {
            return await _sqlClient.RunSpReturnGraph<TaskCategory>("Task.TaskCategory_GetAll");
        }

        public async Task Update(TaskCategory taskCategory)
        {
            await _sqlClient.RunSp("Task.TaskCategory_Update", new
            {
                TaskCategoryID = taskCategory.TaskCategoryID,
                CategoryName = taskCategory.CategoryName
            });
        }

        public async Task Delete(Guid taskCategoryID)
        {
            await _sqlClient.RunSp("Task.TaskCategory_Delete", new
            {
                TaskCategoryID = taskCategoryID
            });
        }
    }
}
