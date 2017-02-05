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
            actionExecutedContext.Response.Content.Headers.Expires = DateTimeOffset.Now.AddDays(-1);
            //Pragma:no-cache
        }
    }
}