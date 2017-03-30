using System;
using System.Collections.Generic;
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
            var sut = new SQLClient();
        }

    }
}
