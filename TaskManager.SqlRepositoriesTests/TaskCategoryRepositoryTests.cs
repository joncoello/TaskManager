using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.DomainModel.Entities;
using TaskManager.SqlRepositories;
using Xunit;

namespace TaskManager.SqlRepositoriesTests
{
    public class TaskCategoryRepositoryTests
    {

        [Fact]
        public async Task<TaskCategory> TaskCategoryRepository_Create()
        {

            var newTaskCategory = new TaskCategory() {
                TaskCategoryName = "Urgent"
            };

            var sut = new TaskCategoryRepository();

            await sut.Create(newTaskCategory);

            return newTaskCategory;

        }

        [Fact]
        public async Task TaskCategoryRepository_Get()
        {
            var newTaskCategory = await TaskCategoryRepository_Create();

            var sut = new TaskCategoryRepository();

            var taskCategory = await sut.Get(newTaskCategory.TaskCategoryID);

            Assert.Equal(newTaskCategory.TaskCategoryName, taskCategory.TaskCategoryName);

        }

        [Fact]
        public async Task TaskCategoryRepository_GetAll()
        {
            var newTaskCategory = await TaskCategoryRepository_Create();

            var sut = new TaskCategoryRepository();

            List<TaskCategory> taskCategories = await sut.GetAll(newTaskCategory.TaskCategoryID);

            Assert.True(taskCategories.Any(tc=>tc.TaskCategoryID==newTaskCategory.TaskCategoryID));

        }

        [Fact]
        public async Task TaskCategoryRepository_Update()
        {
            var newTaskCategory = await TaskCategoryRepository_Create();

            var sut = new TaskCategoryRepository();

            var taskCategory = await sut.Get(newTaskCategory.TaskCategoryID);
            taskCategory.TaskCategoryName = "test123";
            sut.Update(taskCategory);

            var updateTaskCategory = await sut.Get(newTaskCategory.TaskCategoryID);

            Assert.Equal(taskCategory.TaskCategoryName, updateTaskCategory.TaskCategoryName);

        }

    }
}
