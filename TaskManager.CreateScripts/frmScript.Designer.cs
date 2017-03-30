namespace TaskManager.CreateScripts
{
    partial class frmScript
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.button1 = new System.Windows.Forms.Button();
            this.folderBrowserDialog1 = new System.Windows.Forms.FolderBrowserDialog();
            this.label1 = new System.Windows.Forms.Label();
            this.txtPath = new System.Windows.Forms.TextBox();
            this.txtOutputFile = new System.Windows.Forms.TextBox();
            this.lblOutputFile = new System.Windows.Forms.Label();
            this.btnPath = new System.Windows.Forms.Button();
            this.btnOutputFile = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(683, 15);
            this.button1.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(155, 28);
            this.button1.TabIndex = 0;
            this.button1.Text = "Create Script";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(1, 21);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(120, 17);
            this.label1.TabIndex = 3;
            this.label1.Text = "Script Folder path";
            // 
            // txtPath
            // 
            this.txtPath.Location = new System.Drawing.Point(131, 15);
            this.txtPath.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.txtPath.Name = "txtPath";
            this.txtPath.Size = new System.Drawing.Size(501, 22);
            this.txtPath.TabIndex = 4;
            // 
            // txtOutputFile
            // 
            this.txtOutputFile.Location = new System.Drawing.Point(131, 47);
            this.txtOutputFile.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.txtOutputFile.Name = "txtOutputFile";
            this.txtOutputFile.Size = new System.Drawing.Size(501, 22);
            this.txtOutputFile.TabIndex = 5;
            // 
            // lblOutputFile
            // 
            this.lblOutputFile.AutoSize = true;
            this.lblOutputFile.Location = new System.Drawing.Point(3, 50);
            this.lblOutputFile.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblOutputFile.Name = "lblOutputFile";
            this.lblOutputFile.Size = new System.Drawing.Size(77, 17);
            this.lblOutputFile.TabIndex = 6;
            this.lblOutputFile.Text = "Output File";
            // 
            // btnPath
            // 
            this.btnPath.Location = new System.Drawing.Point(640, 15);
            this.btnPath.Margin = new System.Windows.Forms.Padding(4);
            this.btnPath.Name = "btnPath";
            this.btnPath.Size = new System.Drawing.Size(34, 22);
            this.btnPath.TabIndex = 7;
            this.btnPath.Text = "...";
            this.btnPath.UseVisualStyleBackColor = true;
            this.btnPath.Click += new System.EventHandler(this.btnPath_Click);
            // 
            // btnOutputFile
            // 
            this.btnOutputFile.Location = new System.Drawing.Point(640, 47);
            this.btnOutputFile.Margin = new System.Windows.Forms.Padding(4);
            this.btnOutputFile.Name = "btnOutputFile";
            this.btnOutputFile.Size = new System.Drawing.Size(34, 22);
            this.btnOutputFile.TabIndex = 8;
            this.btnOutputFile.Text = "...";
            this.btnOutputFile.UseVisualStyleBackColor = true;
            this.btnOutputFile.Click += new System.EventHandler(this.btnOutputFile_Click);
            // 
            // frmScript
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(855, 91);
            this.Controls.Add(this.btnOutputFile);
            this.Controls.Add(this.btnPath);
            this.Controls.Add(this.lblOutputFile);
            this.Controls.Add(this.txtOutputFile);
            this.Controls.Add(this.txtPath);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.button1);
            this.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.MaximizeBox = false;
            this.Name = "frmScript";
            this.Text = "Create Script";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.FolderBrowserDialog folderBrowserDialog1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtPath;
        private System.Windows.Forms.TextBox txtOutputFile;
        private System.Windows.Forms.Label lblOutputFile;
        private System.Windows.Forms.Button btnPath;
        private System.Windows.Forms.Button btnOutputFile;
    }
}