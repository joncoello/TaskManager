using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using TaskManager.API.Models;
using TaskManager.DomainModel.Entities;
using TaskManager.SqlRepositories;

namespace TaskManager.API.Controllers
{
    [RoutePrefix("api/category")]
    public class CategoryController : ApiController
    {

        private TaskCategoryRepository _categoryRepository;

        public CategoryController()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["TaskManager"].ConnectionString;
            var sqlClient = new SQLClient(connectionString);
            _categoryRepository = new TaskCategoryRepository(sqlClient);
        }

        [Route("")]
        public async Task<IHttpActionResult> Get() {
            var result = await _categoryRepository.GetAll();
            return Ok<IEnumerable<TaskCategory>>(result);
        }

        [Route("")]
        public async Task<IHttpActionResult> Post(TaskCategory newCateogry)
        {
            await _categoryRepository.Create(newCateogry);
            return Created<TaskCategory>("", newCateogry);
        }

        [Route("{newCategoryID}")]
        public async Task<IHttpActionResult> Delete(Guid newCategoryID)
        {
            await _categoryRepository.Delete(newCategoryID);
            return Ok();
        }

    }
}
