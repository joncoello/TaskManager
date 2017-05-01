using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using TaskManager.API.Models;
using TaskManager.DomainModel.Entities;
using TaskManager.DomainModel.Repositories;

namespace TaskManager.API.Controllers
{
    [RoutePrefix("api/home")]
    public class HomeController : ApiController
    {
        private readonly ITaskWidgetRepository _taskWidgetRepository;

        public HomeController(ITaskWidgetRepository taskWidgetRepository)
        {
            _taskWidgetRepository = taskWidgetRepository;
        }

        [Route("")]
        public async Task<IEnumerable<TaskWidgetItem>> Get()
        {
            return await _taskWidgetRepository.Get();
        }

        [Route("{id?}")]
        public void Options(Guid? id = null)
        {

        }
    }
}
