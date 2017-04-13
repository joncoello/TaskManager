using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.SqlRepositoriesTests.Mocks
{
    internal class TestComplexEntity
    {
        public int TestComplexEntityID { get; set; }
        public string TestComplexEntityName { get; set; }

        public TestSimpleEntity Parent { get; set; }

    }
}
    