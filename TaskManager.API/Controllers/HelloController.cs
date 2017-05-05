using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace TaskManager.API.Controllers
{
    public class HelloController : ApiController
    {
        public object Get()
        {
            return new
            {
                Message = "hello world"
            };
        }
    }
}
