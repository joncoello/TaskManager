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
        public async Task TaskCategoryRepository_Create() {

            var newTaskCategory = new TaskCategory();

            var sut = new TaskCategoryRepository();

            await sut.Create(newTaskCategory);

        }

    }
}
