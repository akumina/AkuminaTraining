var SiteCreator = SiteCreator ? SiteCreator : {};

if ((typeof SiteCreator.SampleSubSite) === 'undefined') {
    SiteCreator.SampleSubSite = function () {
        var _cur = this;

        this.Init = function (model) {
            SiteCreator.Eventing.Subscribe('/SiteCreator/DeployButtonclick/', _cur.OnDeploymentClick);
            SiteCreator.Eventing.Subscribe('/SiteCreator/SelectActionChange/', _cur.SelectActionChange);
            SiteCreator.Eventing.Subscribe('/SiteCreator/SiteChange/', _cur.OnSiteChange);
            SiteCreator.Eventing.Subscribe('/SiteCreator/GetFeatureName/', _cur.GetFeatureName);
            _cur.className = model.className;
            _cur.siteContainerId = model.siteContainerId;

            //Get subsites in dropdown
            _cur.GetSubSites();

            _cur.BindEvents();
        };

        this.IsLanguageEnabled = function () {

            $('#ak-loading').show();
            var def = $.Deferred();

            $.ajax({
                url: '/api/Config/IsLanguageEnabled',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                success: function (isLanguageEnabled) {
                    def.resolve(isLanguageEnabled);
                    //Bind dropdown
                    $('#ak-loading').hide();
                },
                error: function (xhr, textStatus, errorThrown) {
                    def.reject();
                    $('#ak-loading').hide();
                }
            });

            return def;
        };

        this.GetSubSites = function () {
            $('#ak-loading').show();

            $.ajax({
                url: '/api/connector/subsites',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    for (var obj in data) {
                        if (obj.indexOf('/') > -1) {
                            var html = "<option value='" + data[obj] + "'>" + obj.substring(obj.lastIndexOf('/') + 1) + "</option>";
                            $('#ak-siteprovisioning-usersetting-SubSite').append(html);
                        }
                    }
                    //Bind dropdown
                    $('#ak-loading').hide();
                },
                error: function (xhr, textStatus, errorThrown) {
                    $('#ak-loading').hide();
                }
            });
        };

        this.IsUpgradeRequired = function (siteId) {
            var def = $.Deferred();

            $.ajax({
                url: '/api/connector/isupgraderequired?siteId=' + siteId,
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    def.resolve(result);
                },
                error: function (xhr, textStatus, errorThrown) {
                    def.reject();
                }
            });

            return def;
        };

        this.BindEvents = function () {
            $('#ak-siteprovisioning-usersetting-SubSite').change(function () {
                $('#ak-loading').show();
                //Display theme image in preview section
                var selectedSubSiteId = this.value;

                //Get properties of subsite
                $.ajax({
                    url: '/api/connector/siteproperties?siteId=' + selectedSubSiteId,
                    type: 'GET',
                    success: function (data) {
                        //Display properties for subsites
                        $("#ak-siteprovisioning-usersetting-Title").val(data.Title);
                        if (data.Url.indexOf('/') > -1) {
                            $("#ak-siteprovisioning-usersetting-URL").val(data.Url.substring(data.Url.lastIndexOf('/') + 1));
                        }
                        //$("#ak-siteprovisioning-usersetting-InheritPermissions").prop("checked", data.InheritPermissions);
                        $("#ak-siteprovisioning-usersetting-Image option[value=" + data.Image + "]").attr('selected', 'selected');

                        $('#ak-loading').hide();
                        //Check if version upgrade is required for selected subsite.
                        //_cur.IsUpgradeRequired(selectedSubSiteId).then(function (isUpgradeRequired) {
                        //    if (!isUpgradeRequired) {
                        //        $("#" + _cur.siteContainerId + " [id^=Step_][data-steptype=Upgrade]").hide();
                        //        if ($('input[type=radio][name=select-an-action][value=UpgradeSite]').is(':checked')) {
                        //            $("#upgradeSiteDiv").show();
                        //        }
                        //    }
                        //    else {
                        //        if ($("#" + _cur.siteContainerId + " [id^=Step_][data-steptype=Upgrade]").length == 0 && $('input[type=radio][name=select-an-action][value=UpgradeSite]').is(':checked')) {
                        //            $("#upgradeSiteDiv").show();
                        //        }
                        //        else {
                        //            $("#" + _cur.siteContainerId + " [id^=Step_][data-steptype=Upgrade]").show();
                        //            $("#upgradeSiteDiv").hide();
                        //        }
                        //    }
                        //    $('#ak-loading').hide();
                        //}, function () {
                        //    $('#ak-loading').hide();
                        //});
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        $('#ak-loading').hide();
                    }
                });
            });
        };

        this.OnDeploymentClick = function (model) {
            BaseDeployment(model, _cur.siteContainerId);
        };

        this.SelectActionChange = function (model) {
            if (model.siteContainerId == _cur.siteContainerId) {
                _cur.DisplayDepartmentProperties();
                $("#ak-siteprovisioning-usersetting-SubSite").parent().hide();
                $("#ak-siteprovisioning-usersetting-Title").val("");
                $("#ak-siteprovisioning-usersetting-Title").attr('disabled', false);
                $("#ak-siteprovisioning-usersetting-URL").val("");
                $("#ak-siteprovisioning-usersetting-URL").attr('disabled', false);
                $("#ak-siteprovisioning-usersetting-InheritPermissions").attr('disabled', false);
                $("#ak-siteprovisioning-usersetting-Image").attr('disabled', false);
                //Detect Add mode
                if ($('input[type=radio][name=select-an-action][value=CreateNewInstallation]').is(':checked')) {
                }//Detect Update mode
                else if ($('input[type=radio][name=select-an-action][value=UpdateConfigurationSettings]').is(':checked')) {
                }//Detect Individual Deployment Step mode
                else if ($('input[type=radio][name=select-an-action][value=ExecuteIndividualDeploymentSteps]').is(':checked')) {
                    //Display all department site properties
                    $("#ak-siteprovisioning-usersetting-SubSite").parent().show();
                    $("#ak-siteprovisioning-usersetting-Title").attr('disabled', true);
                    $("#ak-siteprovisioning-usersetting-URL").attr('disabled', true);
                    $("#ak-siteprovisioning-usersetting-InheritPermissions").attr('disabled', true);
                    $("#ak-siteprovisioning-usersetting-Image").attr('disabled', true);

                    //Trigger subsite change and load subsite properties
                    var firstValue = $("#ak-siteprovisioning-usersetting-SubSite option:first").val();
                    if (firstValue != "" && typeof firstValue != 'undefined') {
                        $("#ak-siteprovisioning-usersetting-SubSite").val($("#ak-siteprovisioning-usersetting-SubSite option:first").val());
                        $("#ak-siteprovisioning-usersetting-SubSite").trigger('change');
                    }

                    $("#" + model.siteContainerId + " [id='Step_Validate User Settings'] .ak-siteprovisioning-featuredeploy-btn").prop("disabled", true).css('opacity', '0.6');
                    $("#" + model.siteContainerId + " [id='Step_Create Site from URL user setting'] .ak-siteprovisioning-featuredeploy-btn").prop("disabled", true).css('opacity', '0.6');
                    $("#" + model.siteContainerId + " [id='Step_Enable Multilingual'] .ak-siteprovisioning-featuredeploy-btn").prop("disabled", true).css('opacity', '0.6');
                    $("#" + model.siteContainerId + " [id='Step_Update Friendly Urls'] .ak-siteprovisioning-featuredeploy-btn").prop("disabled", true).css('opacity', '0.6');
                    $("#" + model.siteContainerId + " [id='Step_Update List Items - Multilang Provisioning'] .ak-siteprovisioning-featuredeploy-btn").prop("disabled", true).css('opacity', '0.6');
                }
                else if ($('input[type=radio][name=select-an-action][value=UpgradeSite]').is(':checked')) {
                    $('#' + model.siteContainerId + " .ak-siteprovisioning-upgrade-btn").hide();
                }
            }
        };

        this.ShowHideMultilingualStep = function () {
            if (_cur.isLanguageEnabled) {
                $("#" + _cur.siteContainerId + " [id='Step_Enable Multilingual']").show();
            }
            else {
                $("#" + _cur.siteContainerId + " [id='Step_Enable Multilingual']").hide();
            }
        };

        this.DisplayDepartmentProperties = function () {
            $("#ak-siteprovisioning-usersetting-Title").parent().show();
            $("#ak-siteprovisioning-usersetting-URL").parent().show();
            $("#ak-siteprovisioning-usersetting-InheritPermissions").parent().show();
            $("#ak-siteprovisioning-usersetting-Image").parent().show();
        };

        this.OnSiteChange = function (model) {
            if (model.siteContainerId == _cur.siteContainerId) {
                    $("#selectActionDiv").show();
                    $("#updateConfigOption").hide();
                    $("#upgradeSiteOption").hide();
            }
        };

        this.GetFeatureName = function (model) {
            BaseGetFeatureName(model, _cur.siteContainerId);
        };
    }
};