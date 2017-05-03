using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.DomainModel.Entities;
using TaskManager.DomainModel.Repositories;

namespace TaskManager.SqlRepositories
{
    public class TaskWidgetRepository : ITaskWidgetRepository
    {
        private SQLClient _sqlClient;

        public TaskWidgetRepository(SQLClient sqlClient)
        {
            this._sqlClient = sqlClient;
        }

        public async Task<IEnumerable<TaskWidgetItem>> Get()
        {
            return await _sqlClient.RunSpReturnGraph<TaskWidgetItem>("Task.TaskWidget_Get");
        }


    }
}
