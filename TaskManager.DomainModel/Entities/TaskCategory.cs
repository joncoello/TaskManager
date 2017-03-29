using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.DomainModel.Entities
{
    public class TaskCategory
    {
        public Guid TaskCategoryID { get; set; }
        public string TaskCategoryName { get; set; }
    }
}
    