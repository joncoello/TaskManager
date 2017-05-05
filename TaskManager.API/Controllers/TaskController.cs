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
    public class TaskController : ApiController
    {

        private ITaskItemRepository _taskRepository;
        private ITaskCategoryRepository _taskCategoryRepository;

        public TaskController(ITaskCategoryRepository taskCategoryRepository, ITaskItemRepository taskRepository)
        {
            _taskCategoryRepository = taskCategoryRepository;
            _taskRepository = taskRepository;
        }
        
        public async Task<IHttpActionResult> Get([FromUri]string categoryName = null)
        {
            var categories = await _taskCategoryRepository.GetAll();
            var categoryList = categories.ToList();
            var tasks = await _taskRepository.GetAll(categoryName);
            var taskList = tasks.ToList();
            var result = new TaskListResponse
            {
                Data = taskList,
            };
            result.Lists.Add(categories);
            return Ok(result);
        }

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

        public async Task<IHttpActionResult> Delete(Guid id)
        {
            await _taskRepository.Delete(id);
            return Ok();
        }

        public async Task<IHttpActionResult> Patch(TaskItem task)
        {
            await _taskRepository.Update(task);
            return Ok();
        }

        public async Task<object> Post(TaskItem task)
        {
            return await _taskRepository.Create(task);
        }

        [AllowAnonymous]
        public void Options(Guid? id = null)
        {

        }

    }
}
