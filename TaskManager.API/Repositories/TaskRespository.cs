using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskManager.API.Models;

namespace TaskManager.API.Repositories
{

    public class TaskRespository
    {
        
        private static readonly List<TaskItem> _tasks = new List<TaskItem> {
                new TaskItem {
                    ID = Guid.NewGuid(),
                    Name = "Finish PDRs",
                    Body = "Sue, Bob, Alan, Claire" 
                },
                new TaskItem{
                    ID = Guid.NewGuid(),
                    Name = "Setup Insurance",
                    Body = "3-6 months with no cancellation fee"
                },
                new TaskItem{
                    ID = Guid.NewGuid(),
                    Name = "Setup Expenses",
                    Body = "Mileage and books"
                }
            };

        public IEnumerable<TaskItem> All()
        {
            return _tasks;
        }

        public TaskItem Find(Guid id)
        {
            return _tasks.FirstOrDefault(t => t.ID == id);
        }

        public void Delete(Guid id)
        {
            var taskToDelete = _tasks.FirstOrDefault(t => t.ID == id);
            if (taskToDelete != null)
            {
                _tasks.Remove(taskToDelete);
            }
        }

        public TaskItem Create(TaskItem task)
        {
            task.ID = Guid.NewGuid();
            _tasks.Add(task);
            return task;
        }

        internal void Update(TaskItem task)
        {
            var taskToUpdate = _tasks.FirstOrDefault(t => t.ID == task.ID);
            if (taskToUpdate != null)
            {
                taskToUpdate.Name = task.Name;
                taskToUpdate.Body = task.Body;
            }
        }
    }
}