using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;

namespace TaskManager.API.Infrastructure {
    public class NoCacheHeaderFilter : ActionFilterAttribute {
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext) {
            actionExecutedContext.Response.Headers.Add("Cache-Control", "no-store, must-revalidate, no-cache, max-age=0");
            actionExecutedContext.Response.Headers.Add("Pragma", "no-cache");
            actionExecutedContext.Response.Headers.Add("Expires", "Mon, 01 Jan 1990 00:00:00 GMT");
            //Pragma:no-cache
        }
    }
}