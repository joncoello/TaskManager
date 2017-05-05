using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers
{
    [RoutePrefix("api/list")]
    public class ListController : ApiController
    {
        [Route("{id?}")]
        public async Task<IHttpActionResult> Get(string id = null)
        {
            if (id == "1")
            {
                return this.Ok<ListView>(new ListView()
                {
                    IdField = "taskCategoryID",
                    Url = "/api/category",
                    Fields = new List<ListViewField>(new[] {
                    new ListViewField() {
                        Id = "categoryName",
                        Name = "category"
                    }
                })
                });
            }
            else if (id == "2")
            {
                return this.Ok<ListView>(new ListView()
                {
                    IdField = "taskItemID",
                    Url = "/api/task",
                    Fields = new List<ListViewField>(new[] {
                    new ListViewField() {
                        Id = "taskName",
                        Name = "task"
                    },
                    new ListViewField() {
                        Id = "taskCategoryID",
                        Name = "category",
                        Combo =new TaskViewComb() {
                            dataField = "catgories",
                            IdField = "taskCategoryID",
                            DisplayField = "categoryName"
                        }
                    }
                })
                });
            }
            else
            {
                return Ok();
            }
        }

        [AllowAnonymous]
        [Route("{id?}")]
        public void Options(Guid? id = null)
        {

        }

    }
}