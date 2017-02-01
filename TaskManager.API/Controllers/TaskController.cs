using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using TaskManager.API.Models;
using TaskManager.API.Repositories;

namespace TaskManager.API.Controllers
{
    [RoutePrefix("api/task")]
    public class TaskController : ApiController
    {

        private TaskRespository _taskRepository;
        private CategoryRepository _categoryRepository;

        public TaskController()
        {
            _taskRepository = new TaskRespository();
            _categoryRepository = new CategoryRepository();
        }
        
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var result = _taskRepository.All();
            return Ok(result);
        }

        [Route("{id}")]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            var task = _taskRepository.Find(id);
            if (task == null)
            {
                return NotFound();
            }
            var result = new
            {
                tasks = _taskRepository.All(),
                categories = _categoryRepository.All()
            };
            return Ok(result);
        }

        [Route("{id}")]
        public async Task<IHttpActionResult> Delete(Guid id)
        {
            _taskRepository.Delete(id);
            return Ok();
        }

        [Route("")]
        public async Task<IHttpActionResult> Patch(TaskItem task)
        {
            _taskRepository.Update(task);
            return Ok();
        }

        [Route("")]
        public async Task<object> Post(TaskItem task)
        {
            _taskRepository.Create(task);
            return task;
        }

    }
}
