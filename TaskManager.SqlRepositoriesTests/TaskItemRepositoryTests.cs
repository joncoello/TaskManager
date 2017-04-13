using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.DomainModel.Entities;
using TaskManager.SqlRepositories;
using Xunit;

namespace TaskManager.SqlRepositoriesTests
{
    [Trait("Category", "Repo")]
    public class TaskItemRepositoryTests
    {
        [Fact]
        public async Task<TaskItem> TaskCategoryRepository_Create()
        {

            var newTaskItem = new TaskItem()
            {
                TaskName = "Urgent"
            };

            var sut = CreateSUT();

            await sut.Create(newTaskItem);

            return newTaskItem;

        }

        private TaskItemRepository CreateSUT()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["TaskManager"].ConnectionString;
            var sqlClient = new SQLClient(connectionString);
            var sut = new TaskItemRepository(sqlClient);
            return sut;
        }

    }
}
