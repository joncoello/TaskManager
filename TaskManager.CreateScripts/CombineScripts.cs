using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.CreateScripts
{
    [Serializable]
    public class CombineScripts
    {

        #region private declarations

        string _filePath;
        string _outputFileName;

        #endregion

        public CombineScripts(string path, string outputFileName, bool createZip)
        {

            _filePath = path;
            _outputFileName = outputFileName;
            ProcessFiles();

            if (createZip)
            {
                //Now zip the file


                //string zipFileName = Path.Combine(Path.GetDirectoryName(outputFileName), Path.GetFileNameWithoutExtension(outputFileName)) + ".zip";


                //C1.C1Zip.C1ZipFile zipFile = new C1.C1Zip.C1ZipFile();

                //if (System.IO.File.Exists(zipFileName))
                //{
                //    System.IO.File.SetAttributes(zipFileName, FileAttributes.Normal);
                //    System.IO.File.Delete(zipFileName);
                //}

                //zipFile.Create(zipFileName);
                //zipFile.Entries.Add(outputFileName);
                //zipFile.Close();
            }
        }


        void ProcessFiles()
        {

            // find all sql files and place them into an array
            string[] filesFound = System.IO.Directory.GetFiles(_filePath, "*.sql", System.IO.SearchOption.AllDirectories);

            System.Collections.Generic.SortedList<int, VersionFiles> list = new SortedList<int, VersionFiles>();

            //  Use regex to find the version number in the file

            System.Text.RegularExpressions.Regex regex = new System.Text.RegularExpressions.Regex(@"^.*Version\s+No\s*(?<version>\d+)", System.Text.RegularExpressions.RegexOptions.Multiline | System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Match match;

            foreach (string filename in filesFound)
            {
                if (filename.ToLower().EndsWith(".sql"))
                {
                    string fileContents = System.IO.File.ReadAllText(filename);

                    match = regex.Match(fileContents);

                    int version = 1000000;

                    if (match.Success)
                    {
                        version = int.Parse(match.Result("${version}"));
                    }

                    // now check to see if the version number is already present. If so just add it

                    if (list.ContainsKey(version))
                    {
                        VersionFiles existingVersion = list[version];
                        existingVersion.AddFile(filename);
                    }
                    else
                    {
                        VersionFiles newVersion = new VersionFiles(version);
                        newVersion.AddFile(filename);
                        list.Add(version, newVersion);
                    }

                }

            }

            // we now have a sortlist of version numbers together with a set of files
            // for each version. Just need to process these in order to create the script


            System.IO.File.Delete(_outputFileName);

            //We create a log file of the items written

            string logFilepath = Path.Combine(Path.GetDirectoryName(_outputFileName), "Script.log");

            System.IO.File.Delete(logFilepath);


            foreach (System.Collections.Generic.KeyValuePair<int, VersionFiles> currentVersion in list)
            {

                string[] files = currentVersion.Value.Files();
                Array.Sort(files);
                Array.Reverse(files);

                foreach (string currentFile in files)
                {
                    System.Text.StringBuilder sb = new StringBuilder();

                    sb.Append(System.IO.File.ReadAllText(currentFile));
                    sb.Append("\r\nGO\r\n"); // append a CR LF to the end of the file plus a GO plus another CR LF


                    System.IO.File.AppendAllText(_outputFileName, sb.ToString());
                    System.IO.File.AppendAllText(logFilepath, currentFile + "\r\n");

                }
            }

        }

        public class VersionFiles
        {

            private int _version;
            private System.Collections.Generic.List<string> files = new List<string>();
            internal VersionFiles(int version)
            {
                _version = version;
            }

            public void AddFile(string fileName)
            {
                files.Add(fileName);

            }

            public string[] Files()
            {
                return files.ToArray();
            }

        }



    }
}
