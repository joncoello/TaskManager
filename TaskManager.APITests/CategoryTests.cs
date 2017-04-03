using Microsoft.Owin.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TaskManager.API;
using TaskManager.DomainModel.Entities;
using Xunit;

namespace TaskManager.APITests
{
    [Trait("Category", "API")]
    public class CategoryTests
    {

        [Fact]
        public async Task Category_Create()
        {

            using (var serverAndClient = new HttpServerAndClient<Startup>())
            {

                var response = await serverAndClient.Client.PostAsJsonAsync("api/category", new TaskCategory {
                    CategoryName = "Information"
                });

                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();

                var newCategory = JsonConvert.DeserializeObject<TaskCategory>(content);

                Assert.NotEqual(Guid.Empty, newCategory.TaskCategoryID);

            }

        }

        [Fact]
        public async Task Category_Get()
        {

            using (var serverAndClient = new HttpServerAndClient<Startup>())
            {

                var response = await serverAndClient.Client.GetAsync("api/category");

                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();

                var obj = JsonConvert.DeserializeObject<IEnumerable<API.Models.TaskItem>>(content);

            }

        }

    }

}
