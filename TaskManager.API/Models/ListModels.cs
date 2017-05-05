using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskManager.API.Models
{
    public class ListView
    {
        public string IdField { get; set; }
        public string Url { get; set; }
        public List<ListViewField> Fields { get; set; }
    }

    public class ListViewField
    {
        public TaskViewComb Combo { get; internal set; }
        public string Id { get; set; }
        public string Name { get; set; }

        public bool IsCombo {
            get { return Combo != null; }
        }

    }

    public class TaskViewComb {

        public int ListIndex { get; set; }

        public string IdField { get; set; }
        public string DisplayField { get; set; }

    }

}