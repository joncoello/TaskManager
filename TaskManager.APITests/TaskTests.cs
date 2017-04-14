using Microsoft.Owin.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Text;
using System.Threading.Tasks;
using TaskManager.API;
using TaskManager.API.Models;
using TaskManager.DomainModel.Entities;
using Xunit;

namespace TaskManager.APITests
{
    [Trait("Category", "API")]
    public class TaskTests
    {

        [Fact]
        public async Task Task_Get()
        {

            using (var serverAndClient = new HttpServerAndClient<Startup>())
            {

                var response = await serverAndClient.Client.GetAsync("api/task");

                response.EnsureSuccessStatusCode();

            }

        }

        [Fact]
        public async Task<Guid> Task_Post()
        {

            using (var serverAndClient = new HttpServerAndClient<Startup>())
            {
                
                var response = await serverAndClient.Client.PostAsJsonAsync<TaskItem>(
                    "api/task",
                    new TaskItem()
                    {
                        TaskName = "Task 1"
                    });

                response.EnsureSuccessStatusCode();

                var task = await response.Content.ReadAsAsync<TaskItem>();

                return task.TaskItemID;

            }

        }

        [Fact]
        public async Task Task_Patch()
        {

            var id = await Task_Post();

            using (var serverAndClient = new HttpServerAndClient<Startup>())
            {
                
                var response = await serverAndClient.Client.PatchAsJsonAsync(
                    "api/task/" + id,
                    new TaskItem()
                    {
                        TaskItemID = id,
                        TaskName = "Task 1"
                    });

                response.EnsureSuccessStatusCode();
                
            }

        }

        [Fact]
        public async Task Task_GetSingle()
        {

            var id = await Task_Post();

            using (var serverAndClient = new HttpServerAndClient<Startup>())
            {

                var response = await serverAndClient.Client.GetAsync("api/task/" + id);

                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();

            }

        }

        [Fact]
        public async Task Task_Delete()
        {

            var newTaskID = await Task_Post();

            using (var serverAndClient = new HttpServerAndClient<Startup>())
            {

                var response = await serverAndClient.Client.DeleteAsync("api/task/" + newTaskID);

                response.EnsureSuccessStatusCode();

                response = await serverAndClient.Client.GetAsync("api/category");

                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();

                var categories = JsonConvert.DeserializeObject<List<TaskItem>>(content);

                Assert.False(categories.Any(t => t.TaskItemID == newTaskID));

            }

        }

    }

    public static class Extensons
    {

        public static Task<HttpResponseMessage> PatchAsJsonAsync<T>(this HttpClient client, string requestUri, T value)
        {
            //Ensure.Argument.NotNull(client, "client");
            //Ensure.Argument.NotNullOrEmpty(requestUri, "requestUri");
            //Ensure.Argument.NotNull(value, "value");

            var content = new ObjectContent<T>(value, new JsonMediaTypeFormatter());
            var request = new HttpRequestMessage(new HttpMethod("PATCH"), requestUri) { Content = content };

            return client.SendAsync(request);
        }

    }

}
