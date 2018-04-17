using Akumina.SiteProvisioning.Common;
using Akumina.SiteProvisioning.Common.Models;
using Akumina.SiteProvisioning.Core;
using Akumina.SiteProvisioning.Core.Interfaces;
using Akumina.SiteProvisioning.Core.Services;
using System;

namespace SiteProvisioning.SampleSite.Steps
{
    public class CreateSiteFromUserSettings : SiteProvisionerStepBase, ISiteProvisionerStep
    {
        public override string StepName => "Create Site from URL user setting";

        public override SiteProvisionerStepType StepType => SiteProvisionerStepType.Add;

        public override SiteProvisionerStepResponse Execute()
        {
            var response = new SiteProvisionerStepResponse();
            var fileService = new FileService();
            var logFileName = GetErrorLogFileName();
            try
            {
                var siteService = new SiteService {AssetDirectory = Properties.AssetDirectory};

                var siteTitle = GetProperty("Title");
                var siteUrl = GetProperty("URL");

                if (string.IsNullOrEmpty(siteTitle) ||
                    string.IsNullOrEmpty(siteUrl))
                {
                    throw new Exception("The Title and URL values are required.");
                }

                var siteInfo = siteService.CreateSubsite(siteTitle, siteUrl);
                var siteId = siteInfo.Id;

                SetSiteId(siteId);
                SetProperty("SiteUrl", siteInfo.Url);
                
                response.Success = true;
            }
            catch (Exception ex)
            {
                fileService.SaveSiteProvisionerErrorLogs(logFileName, ex.StackTrace, null, StepName, StepType.ToString(), Properties.AssetDirectory);
                response.Message = ex.Message;
                response.Success = false;
            }

            return response;
        }
    }
}
