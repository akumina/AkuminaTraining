using Akumina.SiteProvisioning.Common.Models;
using Akumina.SiteProvisioning.Core;
using Akumina.SiteProvisioning.Core.Interfaces;
using Akumina.SiteProvisioning.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteProvisioning.SampleSite.Steps
{
    public class AddSampleImageFilesToStyleLibrary : SiteProvisionerStepBase, ISiteProvisionerStep
    {
        public override string StepName
        {
            get
            {
                return "Add Image Files";
            }
        }

        public override SiteProvisionerStepResponse Execute()
        {
            var response = new SiteProvisionerStepResponse();

            var fileService = new FileService();

            try
            {
                fileService.AssetDirectory = this.Properties.AssetDirectory;

                fileService.AddBrandingFilesToStyleLibrary("img");
                SetUnitOfWork(0);

                response.Message = "Image Files Added";
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
