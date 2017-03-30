using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.SqlRepositories
{
    public class SQLClient
    {
        private string connectionString;

        public SQLClient(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public object GetSingle<T>(string storedProcedureName, object parameters)
        {
            throw new NotImplementedException();
        }
    }
}
