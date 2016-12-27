using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskManager.API.Models
{
    public class TaskItem
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
    }
}