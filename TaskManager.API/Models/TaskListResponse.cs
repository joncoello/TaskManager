﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskManager.DomainModel.Entities;

namespace TaskManager.API.Models
{
    public class TaskListResponse
    {
        public List<TaskItem> Data { get; set; }
        public List<object> Lists { get; private set; }

        public TaskListResponse()
        {
            Lists = new List<object>();
        }
    }
}