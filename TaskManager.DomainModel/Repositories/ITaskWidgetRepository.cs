using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.DomainModel.Entities;

namespace TaskManager.DomainModel.Repositories
{
    public interface ITaskWidgetRepository
    {
        Task<IEnumerable<TaskWidgetItem>> Get();
    }
}