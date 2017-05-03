using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace TaskManager.SqlRepositories
{
    /// <summary>
    /// Generic ORM interface
    /// </summary>
    public interface ISQLClient
    {
        Task<IEnumerable<TReturn>> RunSpReturnGraph<T1, T2, TReturn>(string storedProcedureName, Func<T1, T2, TReturn> map, string splitOn, object parameters = null);
        Task<IEnumerable<T>> RunSpReturnGraph<T>(string storedProcedureName, object parameters = null);
        Task RunSp(string storedProcedureName, object parameters);
    }
}