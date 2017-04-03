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
    public class TaskCategoryRepositoryTests
    {

        [Fact]
        public async Task<TaskCategory> TaskCategoryRepository_Create()
        {

            var newTaskCategory = new TaskCategory() {
                CategoryName = "Urgent"
            };

            var sut = CreateSUT();
            
            await sut.Create(newTaskCategory);

            return newTaskCategory;

        }

        [Fact]
        public async Task TaskCategoryRepository_Get()
        {
            var newTaskCategory = await TaskCategoryRepository_Create();

            var sut = CreateSUT();

            var taskCategory = await sut.Get(newTaskCategory.TaskCategoryID);

            Assert.Equal(newTaskCategory.CategoryName, taskCategory.CategoryName);

        }

        [Fact]
        public async Task TaskCategoryRepository_GetAll()
        {
            var newTaskCategory = await TaskCategoryRepository_Create();

            var sut = CreateSUT();

            var taskCategories = await sut.GetAll(newTaskCategory.TaskCategoryID);

            Assert.True(taskCategories.Any(tc=>tc.TaskCategoryID==newTaskCategory.TaskCategoryID));

        }

        [Fact]
        public async Task TaskCategoryRepository_Update()
        {
            var newTaskCategory = await TaskCategoryRepository_Create();

            var sut = CreateSUT();

            var taskCategory = await sut.Get(newTaskCategory.TaskCategoryID);
            taskCategory.CategoryName = "test123";
            await sut.Update(taskCategory);

            var updateTaskCategory = await sut.Get(newTaskCategory.TaskCategoryID);

            Assert.Equal(taskCategory.CategoryName, updateTaskCategory.CategoryName);

        }

        [Fact]
        public async Task TaskCategoryRepository_Delete()
        {
            var newTaskCategory = await TaskCategoryRepository_Create();

            var sut = CreateSUT();

            var taskCategories = await sut.GetAll(newTaskCategory.TaskCategoryID);

            sut.Delete(newTaskCategory.TaskCategoryID);

            taskCategories = await sut.GetAll(newTaskCategory.TaskCategoryID);

            Assert.False(taskCategories.Any(tc => tc.TaskCategoryID == newTaskCategory.TaskCategoryID));

        }

        private TaskCategoryRepository CreateSUT() {
            var connectionString = ConfigurationManager.ConnectionStrings["TaskManager"].ConnectionString;
            var sqlClient = new SQLClient(connectionString);
            var sut = new TaskCategoryRepository(sqlClient);
            return sut;
        }



    }
}
