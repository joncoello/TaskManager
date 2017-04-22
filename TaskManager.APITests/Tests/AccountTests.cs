using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using TaskManager.API;
using TaskManager.API.Models;
using Xunit;

namespace TaskManager.APITests.Tests
{
    [Trait("Category", "API")]
    public class AccountTests
    {

        [Fact]
        public async Task Account_Register()
        {

            // if login fails then register
            try
            {
                // login
                var token = await Account_Login();
            }
            catch (Exception)
            {
             
                // register                   
                using (var serverAndClient = new HttpServerAndClient<Startup>())
                {

                    var response2 = await serverAndClient.Client.PostAsJsonAsync("api/Account/Register", new RegisterBindingModel()
                    {
                        Email = "bob@mail.com",
                        Password = "Password@123456",
                        ConfirmPassword = "Password@123456"
                    });

                    var responseContent2 = await response2.Content.ReadAsStringAsync();

                    response2.EnsureSuccessStatusCode();

                }

            }

        }

        [Fact]
        public async Task<string> Account_Login()
        {

            using (var serverAndClient = new HttpServerAndClient<Startup>())
            {

                var content = new FormUrlEncodedContent(new[]{
                   new KeyValuePair<string,string>("userName", "bob@mail.com"),
                   new KeyValuePair<string,string>("password", "Password@123456"),
                   new KeyValuePair<string,string>("grant_type", "password")
                });
                
                var response = await serverAndClient.Client.PostAsync("token", content);

                var responseContent = await response.Content.ReadAsStringAsync();

                response.EnsureSuccessStatusCode();

                var json = (JObject)JsonConvert.DeserializeObject(responseContent);

                var token = json["access_token"].Value<string>();

                return token;

            }

        }

    }
}
