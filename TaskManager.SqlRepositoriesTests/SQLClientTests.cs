using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.SqlRepositories;
using Xunit;

namespace TaskManager.SqlRepositoriesTests
{
    
    public class SQLClientTests
    {

        [Fact]
        public void SQLClient_Create() {
            var sut = new SQLClient(null);
        }

        [Fact]
        [UseDatabase]
        public void SQLClient_GetSingleEntity()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["TaskManager"].ConnectionString;
            var csb = new DbConnectionStringBuilder();
            csb.ConnectionString = connectionString;
            csb["database"] = "SQLClientTest";

            var sut = new SQLClient(csb.ConnectionString);

            var entity = sut.GetSingle<TestSimpleEntity>("spGetTestSimpleEntity", new {
                TestSimpleEntityID = 1
            });

        }

    }
}
