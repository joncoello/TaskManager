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
        public async Task<TaskItem> TaskItemRepository_Create()
        {

            var newTaskItem = new TaskItem()
            {
                TaskName = "Urgent"
            };

            var sut = CreateSUT();

            await sut.Create(newTaskItem);

            return newTaskItem;

        }

        [Fact]
        public async Task TaskItemRepository_Get()
        {
            var newTaskItem = await TaskItemRepository_Create();

            var sut = CreateSUT();

            TaskItem taskItem = await sut.Get(newTaskItem.TaskItemID);

            Assert.Equal(newTaskItem.TaskName, taskItem.TaskName);

        }

        [Fact]
        public async Task TaskItemRepository_GetAll()
        {
            var newTaskItem = await TaskItemRepository_Create();

            var sut = CreateSUT();

            var taskItems = await sut.GetAll(null);

            Assert.True(taskItems.Any(ti => ti.TaskItemID == newTaskItem.TaskItemID));

        }

        [Fact]
        public async Task TaskItemRepository_Update()
        {
            var newTaskItem = await TaskItemRepository_Create();

            var sut = CreateSUT();

            var taskCategory = await sut.Get(newTaskItem.TaskItemID);
            taskCategory.TaskName = "test123";
            await sut.Update(taskCategory);

            var updateTaskItem = await sut.Get(newTaskItem.TaskItemID);

            Assert.Equal(taskCategory.TaskName, updateTaskItem.TaskName);

        }

        [Fact]
        public async Task TaskItemRepository_Delete()
        {
            var newTaskItem = await TaskItemRepository_Create();

            var sut = CreateSUT();

            var taskItems = await sut.GetAll(null);

            await sut.Delete(newTaskItem.TaskItemID);

            taskItems = await sut.GetAll(null);

            Assert.False(taskItems.Any(ti => ti.TaskItemID == newTaskItem.TaskItemID));

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
