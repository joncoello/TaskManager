using Newtonsoft.Json.Serialization;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace TaskManager.API
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            // json
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            // cors
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            // routes
            config.MapHttpAttributeRoutes();

            config.Filters.Add(new Infrastructure.NoCacheHeaderFilter());

            ConfigureAuth(app);

            app.UseWebApi(config);
        }
    }
}