using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskManager.API.Models
{
    public class GenericResponse
    {
        public object Data { get; set; }

        public List<object> Lists { get; private set; }

        public GenericResponse()
        {
            this.Lists = new List<object>();
        }
    }
}