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
        public void SQLClient_Create()
        {
            var sut = new SQLClient(null);
        }

        [Fact]
        public async Task SQLClient_GetSingleEntity()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["TaskManager"].ConnectionString;
            var csb = new DbConnectionStringBuilder();
            csb.ConnectionString = connectionString;
            csb["database"] = "SQLClientTest";

            var sut = new SQLClient(csb.ConnectionString);

            var entity = await sut.GetSingle<TestSimpleEntity>("spGetTestSimpleEntity", new
            {
                TestSimpleEntityID = 1
            });

            Assert.NotNull(entity);
            Assert.Equal(1, entity.TestSimpleEntityID);
            Assert.Equal("bob", entity.TestSimpleEntityName);

        }

    }
}
