using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers
{
    [RoutePrefix("api/task")]
    public class TaskController : ApiController
    {

        private readonly List<TaskItem> _tasks;

        public TaskController()
        {
            _tasks = new List<TaskItem> {
                new TaskItem {
                    ID = Guid.NewGuid(),
                    Name = "Task 1"
                },
                new TaskItem{
                    ID = Guid.NewGuid(),
                    Name = "Task 2"
                }
            };
        }

        [Route("")]
        public async Task<object> Get()
        {
            return _tasks;
        }

        [Route("")]
        public async Task<object> Post(TaskItem task)
        {
            return task;
        }

    }
}
