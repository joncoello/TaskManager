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
        
        public TaskController()
        {
            _taskRepository = new TaskRespository();
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
                task = task
            };
            return Ok(result);
        }

        [Route("{id}")]
        public async Task<IHttpActionResult> Delete(Guid id)
        {
            _taskRepository.Delete(id);
            return Ok();
        }

        [Route("{id}")]
        public async Task<IHttpActionResult> Patch(Guid id, TaskItem task)
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
