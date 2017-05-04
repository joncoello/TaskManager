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
using TaskManager.DomainModel.Repositories;
using TaskManager.SqlRepositories;

namespace TaskManager.API.Controllers
{
    [Authorize]
    [RoutePrefix("api/category")]
    public class CategoryController : ApiController
    {

        private ITaskCategoryRepository _categoryRepository;

        public CategoryController(ITaskCategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
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

        [Route("")]
        public async Task<IHttpActionResult> Patch(TaskCategory newCateogry)
        {
            await _categoryRepository.Update(newCateogry);
            return Ok<TaskCategory>(newCateogry);
        }

        [Route("{newCategoryID}")]
        public async Task<IHttpActionResult> Delete(Guid newCategoryID)
        {
            await _categoryRepository.Delete(newCategoryID);
            return Ok();
        }

        [AllowAnonymous]
        [Route("{id?}")]
        public void Options(Guid? id = null) {

        }

    }
}
