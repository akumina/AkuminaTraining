using System.Collections.Generic;
using Akumina.SiteProvisioning.Common.Models;
using Akumina.SiteProvisioning.Core.Interfaces;
using Akumina.SiteProvisioning.Core;
using Akumina.SiteProvisioning.CoreSteps;
using Akumina.SiteProvisioning.Core.Services;
using SiteProvisioning.SampleSite.Steps;

namespace SiteProvisioning.SampleSite
{
    public class SampleSubSite : SiteProvisionerSiteBase
    {
        public override string AssetDirectory => "SampleSubSite";

        public override string Javascript => "~/SiteDefinitions/SampleSubSite/ProvisionerFiles/js/samplesubsite.js";

        public override string FriendlyName => "Sample Sub-site";

        public override string ClassName => "SiteCreator.SampleSubSite";

        public override bool IsVisible => true;

        public override List<ISiteProvisionerStep> Steps
        {
            get
            {
                var _steps = new List<ISiteProvisionerStep>
                {
                    new ValidateUserSettings(),
                    new CreateSiteFromUserSettings(),
                    new SetSecurityOnSite(),
                    new ProvisionLists(),
                    new UploadFiles(),
                    new AddPages(),
                    new AddControlsToPages(),
                    new SetHomePage(),
                    new ResetMasterPageInheritance()
                };
                return _steps;
            }
        }

        public override List<SiteProvisionerSettingsField> UserSettings
        {
            get
            {
                var userSettings = new List<SiteProvisionerSettingsField>
                {
                    new SiteProvisionerSettingsField
                    {
                        Name = "SubSite",
                        Description = "SubSite",
                        DefaultValue = new List<SiteProvisionerSettingsListItem> {},
                        Type = typeof(List<>)
                    },
                    new SiteProvisionerSettingsField
                    {
                        Name = "Title",
                        Description = "The Title of the site to be created",
                        DefaultValue = "",
                        Required = true
                    },
                    new SiteProvisionerSettingsField
                    {
                        Name = "URL",
                        Description = "The URL of the site to be created",
                        DefaultValue = "",
                        Required = true
                    },
                    new SiteProvisionerSettingsField
                    {
                        Name = "InheritPermissions",
                        Description = "Inherit permissions from the parent site",
                        DefaultValue = true,
                        Type = typeof(bool)
                    }                   
                };

                return userSettings;
            }
        }

    }
}
