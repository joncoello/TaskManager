using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.DomainModel.Entities;
using TaskManager.DomainModel.Repositories;

namespace TaskManager.SqlRepositories
{
    /// <summary>
    /// Repository for tasks
    /// </summary>
    public class TaskItemRepository : ITaskItemRepository
    {
        private (ISQLClient _sqlClient;

        public TaskItemRepository(ISQLClient sqlClient)
        {
            this._sqlClient = sqlClient;
        }

        public async Task<TaskItem> Create(TaskItem newTaskItem)
        {
            newTaskItem.TaskItemID = Guid.NewGuid();
            var result = await _sqlClient.RunSpReturnGraph<TaskItem>("Task.TaskItem_Insert", new
            {
                TaskItemID = newTaskItem.TaskItemID,
                TaskName = newTaskItem.TaskName
            });
            return result.ToList()[0];
        }

        public async Task<TaskItem> Get(Guid taskItemID)
        {
            var result = await _sqlClient.RunSpReturnGraph<TaskItem>("Task.TaskItem_Get", new
            {
                TaskItemID = taskItemID
            });
            return result.ToList()[0];
        }

        public async Task<IEnumerable<TaskItem>> GetAll(string categoryName)
        {
            return await _sqlClient.RunSpReturnGraph<TaskItem, TaskCategory, TaskItem>(
                "Task.TaskItem_GetAll",
                (task, category)=> { task.Category = category; return task; }, 
                "TaskCategoryID",
                new {
                    Category = categoryName
                });
        }

        public async Task Update(TaskItem taskItem)
        {
            await _sqlClient.RunSp("Task.TaskItem_Update", new
            {
                TaskItemID = taskItem.TaskItemID,
                TaskCategoryID = taskItem.TaskCategoryID == Guid.Empty ? DBNull.Value : (object)taskItem.TaskCategoryID,
                TaskName = taskItem.TaskName
            });
        }

        public async Task Delete(Guid taskItemID)
        {
            await _sqlClient.RunSp("Task.TaskItem_Delete", new
            {
                TaskItemID = taskItemID
            });
        }

    }
}
