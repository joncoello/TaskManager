using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Dependencies;

namespace TaskManager.Bcl.DI
{
    /// <summary>
    /// IoC interface
    /// </summary>
    public interface IIocContainer
    {
        IDependencyResolver GetResolver();
        void RegisterType<TFrom, TTo>(params object[] parameters) where TTo : TFrom;

    }
}
