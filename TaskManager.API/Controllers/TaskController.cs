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
        public async Task<object> Get()
        {
            return _taskRepository.All();
        }

        [Route("{id}")]
        public async Task<object> Get(Guid id)
        {
            return _taskRepository.Find(id);
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
