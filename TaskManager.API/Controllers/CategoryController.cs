using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers
{
    [RoutePrefix("api/category")]
    public class CategoryController : ApiController
    {
        [Route("")]
        public IHttpActionResult Get() {
            var result = new List<CategoryItem>() {
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Item 1" },
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Item 2" },
                new CategoryItem() { ID = Guid.NewGuid(), Name = "Item 3" }
            };
            return Ok<IEnumerable<CategoryItem>>(result);
        }
    }
}
