using Akumina.SiteProvisioning.Common.Models;
using Akumina.SiteProvisioning.Core;
using Akumina.SiteProvisioning.Core.Interfaces;
using Akumina.SiteProvisioning.Core.Services;
using SiteProvisioning.SampleSite.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteProvisioning.SampleSite.Steps
{
    public class SampleStep : SiteProvisionerStepBase, ISiteProvisionerStep
    {
        public override string StepName
        {
            get { return "Executing a Sample Step"; }
        }

        public override SiteProvisionerStepResponse Execute()
        {
            var response = new SiteProvisionerStepResponse();

            SampleService sampleService = new SampleService();
            sampleService.AssetDirectory = this.Properties.AssetDirectory;

            try
            {              
                sampleService.DoSomething();

                response.Message = "We did something";
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
