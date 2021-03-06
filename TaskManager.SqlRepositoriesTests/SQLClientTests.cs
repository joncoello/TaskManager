﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.SqlRepositories;
using TaskManager.SqlRepositoriesTests.Mocks;
using Xunit;

namespace TaskManager.SqlRepositoriesTests
{

    [Trait("Category", "SQLClient")]
    public class SQLClientTests
    {

        [Fact]
        public void SQLClient_Create()
        {
            var sut = new SQLClient(null);
        }
        
        [Fact]
        public async Task SQLClient_GetEntityList()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["TaskManager"].ConnectionString;
            var csb = new DbConnectionStringBuilder();
            csb.ConnectionString = connectionString;
            csb["database"] = "SQLClientTest";

            var sut = new SQLClient(csb.ConnectionString);

            var list = await sut.RunSpReturnGraph<TestSimpleEntity>("spGetTestSimpleEntityList");

            Assert.NotNull(list);
            Assert.True(list.Count()>0);
            
        }

        [Fact]
        public async Task SQLClient_GetComplex()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["TaskManager"].ConnectionString;
            var csb = new DbConnectionStringBuilder();
            csb.ConnectionString = connectionString;
            csb["database"] = "SQLClientTest";

            var sut = new SQLClient(csb.ConnectionString);

            var entity = 
                await sut.RunSpReturnGraph<TestComplexEntity, TestSimpleEntity, TestComplexEntity>("spGetTestComplexEntities",
                    (complex, simple)=> { complex.Parent = simple; return complex; }, "TestSimpleEntityID");



        }
        
    }
}
