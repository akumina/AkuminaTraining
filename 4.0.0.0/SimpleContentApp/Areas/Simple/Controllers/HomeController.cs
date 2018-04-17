using Akumina.Common.Entities;
using Akumina.Common.Entities.Query;
using Akumina.Interchange.Core.Entities;
using Akumina.Interchange.Core.Entities.Item;
using Akumina.Interchange.Core.Interfaces;
using Akumina.InterChange.SDK.ContentAppHarness.Web.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimpleContentApp.Areas.Simple.Controllers
{
    [Export(typeof(IContentAppController))]
    public class HomeController : Controller, IContentAppController
    {
        public IContentApp ContentApp
        {
            get; set;
        }

        // GET: SimpleContentApp/Home
        public ActionResult Index()
        {
            
            CamlQueryResponse<List<Item>> response = ContentApp.Service.GetList(new Paging() { PageIndex = 1, PageSize = 20 });
            MappingUser map = ContentApp.Service.GetCurrentUser();

            ViewBag.Settings = ContentApp.UserSettings;
            ViewBag.Items = new ConverterService().ConvertListingItems(response.RelevantResults);
            ViewBag.MappingUser = map;


            return View();
        }
    }
}