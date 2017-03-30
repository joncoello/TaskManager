using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TaskManager.CreateScripts
{
    public partial class frmScript : Form
    {
        public frmScript()
        {
            InitializeComponent();

            // set up the databinding to the last opened location

            txtPath.DataBindings.Add("Text", Properties.Settings.Default, "LastPath");
            this.FormClosed += new FormClosedEventHandler(Form1_FormClosed);

        }

        void Form1_FormClosed(object sender, FormClosedEventArgs e)
        {
            Properties.Settings.Default.Save();
        }

        private void button1_Click(object sender, EventArgs e)
        {

            if (txtOutputFile.Text == "" || txtPath.Text == "")
            {
                MessageBox.Show("A path and output file must be entered");
            }
            else
            {
                System.Windows.Forms.Cursor.Current = System.Windows.Forms.Cursors.WaitCursor;
                CombineScripts s = new CombineScripts(txtPath.Text, txtOutputFile.Text, false);
                System.Windows.Forms.MessageBox.Show("Script completed");
                System.Windows.Forms.Cursor.Current = System.Windows.Forms.Cursors.Default;
            }
        }

        private void editBox1_Click(object sender, EventArgs e)
        {
            DialogResult rc;
            rc = folderBrowserDialog1.ShowDialog();
        }
        
        private void btnPath_Click(object sender, EventArgs e)
        {
            DialogResult rc = folderBrowserDialog1.ShowDialog();

            if (rc == DialogResult.OK)
            {
                txtPath.Text = folderBrowserDialog1.SelectedPath;
            }
        }

        private void btnOutputFile_Click(object sender, EventArgs e)
        {
            SaveFileDialog save = new SaveFileDialog();
            save.CheckPathExists = true;
            save.Filter = "Script Files (*.SQL)|*.sql|All Files(*.*)|*.*";

            DialogResult rc = save.ShowDialog();
            if (rc == DialogResult.OK)
            {
                txtOutputFile.Text = save.FileName;
            }
        }
    }
}
