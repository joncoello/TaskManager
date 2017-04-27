using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.Bcl.DI
{
    public class IocContainerFactory
    {
        public IIocContainer Create()
        {
            return new IocContainer();
        }
    }
}
