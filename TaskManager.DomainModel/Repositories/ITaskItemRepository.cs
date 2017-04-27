using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.DomainModel.Entities;

namespace TaskManager.DomainModel.Repositories
{
    public interface ITaskItemRepository
    {
        Task<TaskItem> Create(TaskItem newTaskItem);
        Task Delete(Guid taskItemID);
        Task<TaskItem> Get(Guid taskItemID);
        Task<IEnumerable<TaskItem>> GetAll();
        Task Update(TaskItem taskItem);
    }
}