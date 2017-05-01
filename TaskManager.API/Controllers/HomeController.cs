using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers
{
    [RoutePrefix("api/home")]
    public class HomeController : ApiController
    {

        [Route("")]
        public IEnumerable<TaskWidgetItem> Get()
        {

            return new[] {
                new TaskWidgetItem() { CategoryName = "Urgent", Count=4 },
                new TaskWidgetItem() { CategoryName = "High", Count=12 },
                new TaskWidgetItem() { CategoryName = "Medium", Count=8 },
                new TaskWidgetItem() { CategoryName = "Low", Count=3 },
                new TaskWidgetItem() { CategoryName = "Info", Count=7 }
            };

        }

        [Route("{id?}")]
        public void Options(Guid? id = null)
        {

        }
    }
}
