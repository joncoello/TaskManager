using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Reflection;
using Xunit.Sdk;

namespace TaskManager.SqlRepositoriesTests
{
    internal class UseDatabaseAttribute : BeforeAfterTestAttribute
    {
        public async override void Before(MethodInfo methodUnderTest)
        {

            string connectionString = ConfigurationManager.ConnectionStrings["TaskManager"].ConnectionString;

            using (var conn = new SqlConnection(connectionString))
            {

                await conn.OpenAsync();

                    //// delete data
                    //using (var command = new SqlCommand("delete from Contact", conn))
                    //{
                    //    await command.ExecuteNonQueryAsync();
                    //}

                    ////insert test data
                    //string sql = CCH.BCL.Properties.Resources.InsertContactData;
                    //using (var command = new SqlCommand(sql, conn))
                    //{
                    //    await command.ExecuteNonQueryAsync();
                    //}

            }

        }
    }
}