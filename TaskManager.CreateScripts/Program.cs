using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TaskManager.CreateScripts
{
    class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {

            string[] line = Environment.GetCommandLineArgs();

            // if we are supplied a path then don't display a UI
            // just combine the scripts in that folder and exit
            if (line.Length > 2)
            {
                string folderPath = line[1];
                string saveFileAs = line[2];

                CombineScripts c = new CombineScripts(folderPath, saveFileAs, true);
                Console.WriteLine("Script generated.");
            }
            else
            {
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new frmScript());
            }
        }
    }
}
