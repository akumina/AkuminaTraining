using Akumina.Logging;
using Akumina.SiteProvisioning.Common.Models;
using Akumina.SiteProvisioning.Core;
using Akumina.SiteProvisioning.Core.Interfaces;
using SiteProvisioning.SampleSite.Steps;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteProvisioning.SampleSite
{
    public class Example : SiteProvisionerSiteBase
    {
        public override string AssetDirectory
        {
            get { return "Example"; }
        }

        public override string Javascript
        {
            get { return "~/SiteDefinitions/Example/ProvisionerFiles/js/example.js"; }
        }

        public override string FriendlyName
        {
            get { return "Example Site"; }
        }

        public override string ClassName
        {
            get { return "SiteCreator.Example"; }
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

                _steps.Add(new SampleStep());

                _steps.Add(new SampleStepWithUserInputs());

                return _steps;
            }
        }

        public override List<SiteProvisionerSettingsField> UserSettings
        {
            get
            {
                var _userSettings = new List<SiteProvisionerSettingsField>();

                _userSettings.Add(
                    new SiteProvisionerSettingsField()
                    {
                        Name = "Title",
                        Description = "This is a Sample Field",
                        DefaultValue = "",
                        Required = true
                    }
                );

                return _userSettings;
            }
        }
    }
}
