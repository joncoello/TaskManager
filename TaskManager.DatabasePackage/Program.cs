using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.CreateScripts;

namespace TaskManager.DatabasePackage
{
    class Program
    {
        static void Main(string[] args)
        {

            Console.WriteLine("Generating script...");

            try
            {
                var path = AppDomain.CurrentDomain.BaseDirectory;
                var outputFilename = "scripts.sql";
                var createZip = false;

                var scriptCombiner = new CombineScripts(path, outputFilename, createZip);

                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("Script created");
                
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Script failed");
                Console.WriteLine(ex.ToString());
            }

            Console.ReadKey();
            
        }
    }
}
