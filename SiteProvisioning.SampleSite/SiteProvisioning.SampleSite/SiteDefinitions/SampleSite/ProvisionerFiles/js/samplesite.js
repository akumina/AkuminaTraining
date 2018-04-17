var SiteCreator = SiteCreator ? SiteCreator : {};

if ((typeof SiteCreator.SampleSite) === 'undefined') {
    SiteCreator.SampleSite = function () {
        var _cur = this;

        this.Init = function (model) {
            SiteCreator.Eventing.Subscribe('/SiteCreator/DeployButtonclick/', _cur.OnDeploymentClick);
            SiteCreator.Eventing.Subscribe('/SiteCreator/SelectActionChange/', _cur.SelectActionChange);
            SiteCreator.Eventing.Subscribe('/SiteCreator/SiteChange/', _cur.OnSiteChange);
            SiteCreator.Eventing.Subscribe('/SiteCreator/GetFeatureName/', _cur.GetFeatureName);
            _cur.className = model.className;
            _cur.siteContainerId = model.siteContainerId;
        };

        this.OnDeploymentClick = function (model) {
            BaseDeployment(model, _cur.siteContainerId);
        };

        this.SelectActionChange = function (model) {
            if (model.siteContainerId == _cur.siteContainerId) {
                //Detect Add mode
                if ($('input[type=radio][name=select-an-action][value=CreateNewInstallation]').is(':checked')) {
                }//Detect Update mode
                else if ($('input[type=radio][name=select-an-action][value=UpdateConfigurationSettings]').is(':checked')) {
                }
            }
        };

        this.OnSiteChange = function (model) {
            if (model.siteContainerId == _cur.siteContainerId) {
                $("#selectActionDiv").show();
                $("#updateConfigOption").hide();
            }
        };

        this.GetFeatureName = function (model) {
            BaseGetFeatureName(model, _cur.siteContainerId);
        };
    }
};