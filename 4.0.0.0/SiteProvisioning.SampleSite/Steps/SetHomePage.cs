using Akumina.SiteProvisioning.Common.Models;
using Akumina.SiteProvisioning.Core;
using Akumina.SiteProvisioning.Core.Interfaces;
using Akumina.SiteProvisioning.Core.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteProvisioning.SampleSite.Steps
{
    public class SetHomePage : SiteProvisionerStepBase, ISiteProvisionerStep
    {
        public override string StepName
        {
            get
            {
                return "Setting Home Page";
            }
        }

        public override SiteProvisionerStepResponse Execute()
        {
            var response = new SiteProvisionerStepResponse();

            var settingsService = new SettingsService();

            try
            {
                settingsService.SiteId = GetSiteId();
                settingsService.SetHomePage("Pages/Home.aspx");

                response.Message = "Home Page set";
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Success = false;
            }

            return response;
        }
    }
}
