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
    [RoutePrefix("api/task")]
    public class TaskController : ApiController
    {

        private ITaskItemRepository _taskRepository;
        private ITaskCategoryRepository _taskCategoryRepository;

        public TaskController(ITaskCategoryRepository taskCategoryRepository, ITaskItemRepository taskRepository)
        {
            _taskCategoryRepository = taskCategoryRepository;
            _taskRepository = taskRepository;
        }
        
        [Route("")]
        public async Task<IHttpActionResult> Get([FromUri]string categoryName = null)
        {
            var result = await _taskRepository.GetAll(categoryName);
            return Ok(result);
        }

        [Route("{id}")]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            var categories = await _taskCategoryRepository.GetAll();
            var categoryList = categories.ToList();
            var task = await _taskRepository.Get(id);
            if (task == null)
            {
                return NotFound();
            }
            var result = new Models.TaskItemResponse
            {
                Task = task,
                Categories = categoryList
            };
            return Ok(result);
            }

        [Route("{id}")]
        public async Task<IHttpActionResult> Delete(Guid id)
        {
            await _taskRepository.Delete(id);
            return Ok();
        }

        [Route("")]
        public async Task<IHttpActionResult> Patch(TaskItem task)
        {
            await _taskRepository.Update(task);
            return Ok();
        }

        [Route("")]
        public async Task<object> Post(TaskItem task)
        {
            return await _taskRepository.Create(task);
        }

        [AllowAnonymous]
        [Route("{id?}")]
        public void Options(Guid? id = null)
        {

        }

    }
}
