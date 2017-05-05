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
    public class CategoryController : ApiController
    {

        private ITaskCategoryRepository _categoryRepository;

        public CategoryController(ITaskCategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        
        public async Task<IHttpActionResult> Get() {
            var result = await _categoryRepository.GetAll();
            return Ok<IEnumerable<TaskCategory>>(result);
        }
        
        public async Task<IHttpActionResult> Post(TaskCategory newCateogry)
        {
            await _categoryRepository.Create(newCateogry);
            return Created<TaskCategory>("", newCateogry);
        }
        
        public async Task<IHttpActionResult> Patch(TaskCategory newCateogry)
        {
            await _categoryRepository.Update(newCateogry);
            return Ok<TaskCategory>(newCateogry);
        }

        public async Task<IHttpActionResult> Delete(Guid id)
        {
            await _categoryRepository.Delete(id);
            return Ok();
        }

        [AllowAnonymous]
        [Route("{id?}")]
        public void Options(Guid? id = null) {

        }

    }
}
