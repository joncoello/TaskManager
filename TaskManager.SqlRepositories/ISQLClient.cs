using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace TaskManager.SqlRepositories
{
    public interface ISQLClient
    {
        Task<IEnumerable<TReturn>> GetComplex<T1, T2, TReturn>(string storedProcedureName, object parameters, Func<T1, T2, TReturn> map, string splitOn);
        Task<IEnumerable<T>> GetList<T>(string storedProcedureName);
        Task<T> GetSingle<T>(string storedProcedureName, object parameters);
        Task RunSp(string storedProcedureName, object parameters);
    }
}