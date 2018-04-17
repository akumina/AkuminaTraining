using Akumina.Interchange.Core;
using Akumina.Interchange.Core.Entities;
using Akumina.Interchange.Core.Entities.Security;
using Akumina.Interchange.Core.Enums;
using Akumina.Interchange.Core.Factory;
using Akumina.Interchange.Core.Interfaces;
using Akumina.Interchange.Core.Interfaces.Repository;
using Akumina.Interchange.Services;
using Akumina.Interchange.Services.Repository;
using SimpleContentApp;
using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.ComponentModel.Composition.Hosting;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.SessionState;
using Akumina.InterChange.SDK.ContentAppHarness.Web;

namespace SimpleContentApp
{
    public class MvcApplication : GlobalApplication
    {
        protected override void Application_Start()
        {
            base.Application_Start();
        }

   protected override void Application_Error()
        {
            Exception exception = Server.GetLastError();

            base.Application_Error();
        }

    }
}
