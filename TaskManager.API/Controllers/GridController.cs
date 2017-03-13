using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers
{
    [RoutePrefix("api/grid")]
    public class GridController : ApiController
    {

        [Route("")]
        public async Task<object> Post(List<GridItem> gridItems)
        {
            
            return this.Ok();
        }

    }
}