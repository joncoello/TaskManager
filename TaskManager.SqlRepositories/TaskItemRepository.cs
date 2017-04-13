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

        public async Task Create(TaskItem newTaskItem)
        {
            newTaskItem.TaskItemID = Guid.NewGuid();
            await _sqlClient.RunSp("Task.TaskItem_Insert", new
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
    }
}
