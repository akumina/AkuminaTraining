

var SampleWidget = function(){

    this.Init = function (properties) {
       
        _cur.properties = _cur.SetDefaultsProperties(MyFormsRequest);
        _cur.properties.EditMode = Akumina.AddIn.Utilities.getEditMode();
       
        _cur.Prerender();
    };

    this.GetPropertyValue = function (requestIn, key, defaultValue) {
        var propertyValue = "";

        for (var prop in requestIn) {
            if (key.toLowerCase() == prop.toLowerCase()) {
                propertyValue = requestIn[prop];
                break;
            }
        }

        return (propertyValue == undefined || propertyValue.toString().trim() == "") ? defaultValue : propertyValue;
    };

    this.SetDefaultsProperties = function (requestIn) {

        var requestOut = requestIn;

        requestOut.SenderId = _cur.GetPropertyValue(requestIn, "id", "");
        requestOut.DisplayTemplateUrl = _cur.GetPropertyValue(requestIn, "displaytemplateurl", _cur.GetDefaultTemplateUrl());
        
        return requestOut;
    };

    this.Prerender = function () {
        var targetDiv = _cur.properties.SenderId;
        $("#" + targetDiv).html(Akumina.Digispace.ConfigurationContext.LoadingTemplateHtml);
        Akumina.Digispace.AppPart.Eventing.Subscribe('/loader/completed/', _cur.Render, _cur.properties.SenderId);
        Akumina.Digispace.AppPart.Eventing.Subscribe('/widget/updated/', _cur.RefreshWidget, _cur.properties.SenderId);
    };

    this.Render = function(){

        //RENDER!!!!

    };

    this.RefreshWidget = function (newProps) {
        if (newProps["id"] == _cur.properties.SenderId) {
            _cur.properties = _cur.SetDefaultsProperties(newProps);
            _cur.properties.PageEditMode = _cur.GetPropertyValue(newProps, "pageEditMode", "view");
            _cur.properties.EditMode = Akumina.AddIn.Utilities.getEditMode();
            _cur.Render();
        }
    };

}

module.exports = SampleWidget;