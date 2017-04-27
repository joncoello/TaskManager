using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.DomainModel.Entities;

namespace TaskManager.DomainModel.Repositories
{
    public interface ITaskCategoryRepository
    {
        Task Create(TaskCategory newTaskCategory);
        Task Delete(Guid taskCategoryID);
        Task<TaskCategory> Get(Guid taskCategoryID);
        Task<IEnumerable<TaskCategory>> GetAll();
        Task Update(TaskCategory taskCategory);
    }
}