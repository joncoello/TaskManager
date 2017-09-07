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
    [Authorize]
    public class HomeController : ApiController
    {
        private readonly ITaskWidgetRepository _taskWidgetRepository;

        public HomeController(ITaskWidgetRepository taskWidgetRepository)
        {
            _taskWidgetRepository = taskWidgetRepository;
        }
        
        public async Task<IEnumerable<TaskWidgetItem>> Get()
        {
            return await _taskWidgetRepository.Get();
        }
        
        public void Options(Guid? id = null)
        {

        }
    }
}
