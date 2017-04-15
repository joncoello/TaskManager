using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.DomainModel.Entities;

namespace TaskManager.SqlRepositories
{
    public class TaskItemRepository
    {
        private SQLClient _sqlClient;

        public TaskItemRepository(SQLClient sqlClient)
        {
            this._sqlClient = sqlClient;
        }

        public async Task<TaskItem> Create(TaskItem newTaskItem)
        {
            newTaskItem.TaskItemID = Guid.NewGuid();
            return await _sqlClient.GetSingle<TaskItem>("Task.TaskItem_Insert", new
            {
                TaskItemID = newTaskItem.TaskItemID,
                TaskName = newTaskItem.TaskName
            });
        }

        public async Task<TaskItem> Get(Guid taskItemID)
        {
            return await _sqlClient.GetSingle<TaskItem>("Task.TaskItem_Get", new
            {
                TaskItemID = taskItemID
            });
        }

        public async Task<IEnumerable<TaskItem>> GetAll()
        {
            return await _sqlClient.GetComplex<TaskItem, TaskCategory, TaskItem>("Task.TaskItem_GetAll",
                (task, category)=> { task.Category = category; return task; }, "TaskCategoryID");
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
