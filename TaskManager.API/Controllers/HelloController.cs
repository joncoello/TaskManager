using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace TaskManager.API.Controllers
{
    [RoutePrefix("api/hello")]
    public class HelloController : ApiController
    {
        [Route("")]
        public async Task<string> Get() {
            return "hello world";
        }
    }
}
