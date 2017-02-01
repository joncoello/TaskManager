using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.APITests
{
    public class HttpServerAndClient<T> : IDisposable
    {
        private HttpClient _client;
        public HttpClient Client
        {
            get { return _client; }
        }

        private IDisposable _server;
        public IDisposable Server
        {
            get { return _server; }
        }

        public HttpServerAndClient()
        {
            var l = new TcpListener(IPAddress.Loopback, 0);
            l.Start();
            int port = ((IPEndPoint)l.LocalEndpoint).Port;
            l.Stop();

            string address = "http://localhost:" + port.ToString();

            _server = WebApp.Start<T>(address);

            _client = new HttpClient();
            _client.BaseAddress = new Uri(address);

        }

        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        //// NOTE: Leave out the finalizer altogether if this class doesn't   
        //// own unmanaged resources itself, but leave the other methods  
        //// exactly as they are.   
        //~HttpServerAndClient()
        //{
        //    // Finalizer calls Dispose(false)  
        //    Dispose(false);
        //}

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                // free managed resources  
                if (_client != null)
                {
                    _client.Dispose();
                    _client = null;
                }

                if (_server != null)
                {
                    _server.Dispose();
                    _server = null;
                }
            }
            //// free native resources if there are any.  
            //if (nativeResource != IntPtr.Zero)
            //{
            //    Marshal.FreeHGlobal(nativeResource);
            //    nativeResource = IntPtr.Zero;
            //}
        }
        #endregion

    }
}
