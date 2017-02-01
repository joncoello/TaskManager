using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaskManager.API.Models;
using TaskManager.API.Repositories;

namespace TaskManager.API.Controllers
{
    [RoutePrefix("api/category")]
    public class CategoryController : ApiController
    {

        private CategoryRepository _categoryRepository;

        public CategoryController()
        {
            _categoryRepository = new CategoryRepository();
        }

        [Route("")]
        public IHttpActionResult Get() {
            var result = _categoryRepository.All();
            return Ok<IEnumerable<CategoryItem>>(result);
        }
    }
}
