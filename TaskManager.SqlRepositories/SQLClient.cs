using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.SqlRepositories
{
    /// <summary>
    /// Class to act as generic ORM implementation using dapper
    /// </summary>
    public class SQLClient : ISQLClient
    {
        private string _connectionString;

        public SQLClient(string connectionString)
        {
            this._connectionString = connectionString;
        }
        
        public async Task<IEnumerable<TReturn>> RunSpReturnGraph<T1, T2, TReturn>(string storedProcedureName, Func<T1, T2, TReturn> map, string splitOn, object parameters = null)
        {
            
            using (var conn = new SqlConnection(_connectionString))
            {
                await conn.OpenAsync();

                var data = conn.Query<T1, T2, TReturn>(storedProcedureName, 
                    commandType: System.Data.CommandType.StoredProcedure, 
                    map: map, splitOn: splitOn, param: parameters);

                return data;

            }
        }

        public async Task<IEnumerable<T>> RunSpReturnGraph<T>(string storedProcedureName, object parameters = null)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                await conn.OpenAsync();

                var data = await conn.QueryAsync<T>(storedProcedureName, commandType: CommandType.StoredProcedure, param: parameters);

                return data;

            }
        }

        public async Task RunSp(string storedProcedureName, object parameters)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                await conn.ExecuteAsync(storedProcedureName, 
                    commandType: System.Data.CommandType.StoredProcedure, param: parameters);
            }
        }
    }
}
