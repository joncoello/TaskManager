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
using Xunit;

namespace TaskManager.APITests
{
    [Trait("Category", "API")]
    public class TaskTests
    {

        [Fact]
        public async Task Task_Get() {

            var url = "http://localhost:8990";

            using (WebApp.Start<Startup>(url))
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(url);

                    var response = await client.GetAsync("api/task");

                    response.EnsureSuccessStatusCode();

                    var content = await response.Content.ReadAsStringAsync();

                    response.EnsureSuccessStatusCode();

                }
            }

        }

        [Fact]
        public async Task Task_Post()
        {

            var url = "http://localhost:8990";

            using (WebApp.Start<Startup>(url))
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(url);

                    var response = await client.PostAsync("api/task", null);

                    response.EnsureSuccessStatusCode();

                    var content = await response.Content.ReadAsStringAsync();

                    response.EnsureSuccessStatusCode();

                }
            }

        }

    }
}
