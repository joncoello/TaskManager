using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.SqlRepositories
{
    public class SQLClient
    {
        private string _connectionString;

        public SQLClient(string connectionString)
        {
            this._connectionString = connectionString;
        }

        public async Task<T> GetSingle<T>(string storedProcedureName, object parameters)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                return await conn.QuerySingleAsync<T>(storedProcedureName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);
            }
        }
    }
}
