using Akumina.Logging;
using Akumina.SiteProvisioning.Common.Models;
using Akumina.SiteProvisioning.Core;
using Akumina.SiteProvisioning.Core.Interfaces;
using Akumina.SiteProvisioning.CoreSteps;
using SiteProvisioning.SampleSite.Steps;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteProvisioning.SampleSite
{
    public class SampleSite : SiteProvisionerSiteBase
    {
        public override string AssetDirectory
        {
            get
            {
                return "SampleSite";
            }
        }

        public override string Javascript
        {
            get 
            {
                return "~/SiteDefinitions/SampleSite/ProvisionerFiles/js/samplesite.js";
            }
        }

        public override string FriendlyName
        {
            get 
            {
                return "Sample Site";
            }
        }

        public override string ClassName
        {
            get 
            { 
                return "SiteCreator.SampleSite"; 
            }
        }

        public override bool IsVisible
        {
            get
            {
                var siteCreationService = new SiteCreationService();
                return !siteCreationService.IsSubsite();
            }
        }

        public override List<ISiteProvisionerStep> Steps
        {
            get 
            {
                var _steps = new List<ISiteProvisionerStep>();
 
                //      Ensure Asset Dir exists
                _steps.Add(new EnsureAssetDirectoryExists());

                //      Checking Prerequisites
                _steps.Add(new CheckPreReqs());
                
                //      Create Lists needed for ignite
                _steps.Add(new ProvisionLists());

                _steps.Add(new UploadFiles());

                //      Add CSS Files
                _steps.Add(new AddSampleCSSToStyleLibrary());

                //      Add JS files
                _steps.Add(new AddJSFilesToStyleLibrary());

                //      Content files
                _steps.Add(new AddContentFilesToStyleLibrary());
                
                //      AddImgFilesToSite
                _steps.Add(new AddSampleImageFilesToStyleLibrary());

                //      Add masterpage to site
                _steps.Add(new AddMasterPageFiles());
          
                //      Add Page Layouts
                _steps.Add(new AddPageLayouts());
                    
                //      Add Pages
                _steps.Add(new AddPages());

                //      Add Controls To Pages
                _steps.Add(new AddControlsToPages());

                //      redirect landing page to Home.aspx
                _steps.Add(new SetHomePage());              

                return _steps;
            }
        }

        public override List<SiteProvisionerSettingsField> UserSettings 
        {
            get
            {
                return new List<SiteProvisionerSettingsField>();
            }
        }
    }
}
