using Newtonsoft.Json.Serialization;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using TaskManager.Bcl.DI;
using TaskManager.DomainModel.Repositories;
using TaskManager.SqlRepositories;

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

            //// cors
            //var cors = new EnableCorsAttribute("*", "*", "*");
            //config.EnableCors(cors);

            // routes
            config.MapHttpAttributeRoutes();

            //filters
            config.Filters.Add(new Infrastructure.NoCacheHeaderFilter());

            //auth
            ConfigureAuth(app);

            //ioc
            var iocContainer = new IocContainerFactory().Create();
            var connectionString = ConfigurationManager.ConnectionStrings["TaskManager"].ConnectionString;
            iocContainer.RegisterType<ISQLClient, SQLClient>(connectionString);
            iocContainer.RegisterType<ITaskItemRepository, TaskItemRepository>();
            iocContainer.RegisterType<ITaskCategoryRepository, TaskCategoryRepository>();
            iocContainer.RegisterType<ITaskWidgetRepository, TaskWidgetRepository>();
            config.DependencyResolver = iocContainer.GetResolver();

            app.UseWebApi(config);
        }
    }
}