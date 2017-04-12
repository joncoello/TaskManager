using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskManager.DomainModel.Entities;

namespace TaskManager.API.Models
{
    public class TaskItemResponse
    {
        public TaskItem Task { get; set; }
        public List<TaskCategory> Categories { get; set; }
    }
}