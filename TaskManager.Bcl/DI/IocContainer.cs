using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Dependencies;

namespace TaskManager.Bcl.DI
{
    /// <summary>
    /// IoC conatinaer using Autofac
    /// </summary>
    public class IocContainer : IIocContainer
    {
        
        private readonly UnityContainer _container;

        public IocContainer()
        {
            _container = new UnityContainer();
        }
        
        public void RegisterType<TFrom, TTo>(params object[] parameters) where TTo : TFrom
        {
            if (parameters.Length == 0)
            {
                _container.RegisterType<TFrom, TTo>();
            }
            else
            {
                _container.RegisterType<TFrom, TTo>(new InjectionConstructor(parameters));
            }
        }


        public IDependencyResolver GetResolver()
        {
            return new UnityResolver(_container);
        }

    }

}
