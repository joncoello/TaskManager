﻿using Microsoft.Owin.Hosting;
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

namespace TaskManager.APITests.Tests
{
    [Trait("Category", "API")]
    public class HelloWorldTests
    {

        [Fact]
        public async Task HelloWorld_Get()
        {
            
            using (var serverAndClient = new HttpServerAndClient<Startup>())
            {

                var response = await serverAndClient.Client.GetAsync("api/hello");

                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();

                var obj = (JObject)JsonConvert.DeserializeObject(content);

                Assert.Equal("hello world", obj["message"].ToString());


            }

        }


    }
}
