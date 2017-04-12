using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using TaskManager.API.Models;
using TaskManager.API.Repositories;
using TaskManager.SqlRepositories;

namespace TaskManager.API.Controllers
{
    [RoutePrefix("api/task")]
    public class TaskController : ApiController
    {

        private TaskRespository _taskRepository;
        private TaskCategoryRepository _taskCategoryRepository;

        public TaskController()
        {
            _taskRepository = new TaskRespository();
            var connectionString = ConfigurationManager.ConnectionStrings["TaskManager"].ConnectionString;
            var sqlClient = new SQLClient(connectionString);
            _taskCategoryRepository = new TaskCategoryRepository(sqlClient);
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
            var categories = await _taskCategoryRepository.GetAll();
            var categoryList = categories.ToList();
            var task = _taskRepository.Find(id);
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
