﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.DomainModel.Entities
{
    public class TaskItem
    {
        public Guid TaskItemID { get; set; }
        public string TaskName { get; set; }
    }
}
