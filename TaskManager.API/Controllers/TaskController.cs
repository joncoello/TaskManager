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
    [RoutePrefix("api/task")]
    public class TaskController : ApiController
    {

        private TaskItemRepository _taskRepository;
        private TaskCategoryRepository _taskCategoryRepository;

        public TaskController()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["TaskManager"].ConnectionString;
            var sqlClient = new SQLClient(connectionString);
            _taskRepository = new TaskItemRepository(sqlClient);
            _taskCategoryRepository = new TaskCategoryRepository(sqlClient);
        }
        
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var result = await _taskRepository.GetAll();
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

        [Route("{id}")]
        public async Task<IHttpActionResult> Patch(Guid id, TaskItem task)
        {
            await _taskRepository.Update(task);
            return Ok();
        }

        [Route("")]
        public async Task<object> Post(TaskItem task)
        {
            return await _taskRepository.Create(task);
        }

    }
}
