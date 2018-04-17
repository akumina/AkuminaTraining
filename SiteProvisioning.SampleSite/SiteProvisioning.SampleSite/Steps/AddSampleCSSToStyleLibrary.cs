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
    public class AddSampleCSSToStyleLibrary : SiteProvisionerStepBase, ISiteProvisionerStep
    {
        public override string StepName
        {
            get
            {
                return "Add CSS Files";
            }
        }

        public override SiteProvisionerStepResponse Execute()
        {
            var response = new SiteProvisionerStepResponse();

            var fileService = new FileService();

            try
            {
                fileService.AssetDirectory = this.Properties.AssetDirectory;

                var cssUnitsOfWork = fileService.GetAddBrandingFilesToStyleLibraryWorkUnits("CSS");
                //  for scss
                var maxUnitsOfWork = cssUnitsOfWork + 1;
                var unitOfWork = GetUnitOfWork();

                var newUnitOfWork = 0;
                if (unitOfWork < cssUnitsOfWork)
                {
                    newUnitOfWork = fileService.AddBrandingFilesToStyleLibrary("CSS", unitOfWork);
                    if (newUnitOfWork == 0)
                    {
                        newUnitOfWork = cssUnitsOfWork;
                    }
                }

                if (newUnitOfWork == 0 ||
                    newUnitOfWork >= maxUnitsOfWork)
                {
                    SetUnitOfWork(0);
                }
                else
                {
                    SetUnitOfWork(newUnitOfWork);
                }

                response.Message = "CSS Files Added";
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
