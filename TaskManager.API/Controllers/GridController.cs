using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers
{
    [Authorize]
    public class GridController : ApiController
    {

        public object Post(List<GridItem> gridItems)
        {
            
            return this.Ok();
        }

    }
}