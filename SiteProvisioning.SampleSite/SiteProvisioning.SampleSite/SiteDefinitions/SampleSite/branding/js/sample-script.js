Akumina.Digispace.AppPart.Eventing.Subscribe('/loader/handlesharepointbar/', SampleHandleSharepointBar);


function SampleHandleSharepointBar(args) {
    if (args.ShowSharepointBar) {
        Akumina.Digispace.Utilities.ShowSharepointBar(args.SetCookie);
        $('#s4-workspace').css('height', $(window).outerHeight() - $('#ms-designer-ribbon').height());

        $(".toggle-sharepoint").text("Hide Sharepoint Ribbon");
    }
    else {

        Akumina.Digispace.Utilities.HideSharepointBar(args.SetCookie);
        $('#s4-workspace').height($(window).outerHeight());
        $(".toggle-sharepoint").text("Show Sharepoint Ribbon");
    }

}

function ToggleSharePointBar()
{
    var isSharepointBarShown = false;
    if ($(".toggle-sharepoint").text().toLowerCase().indexOf("show") == -1) {
        isSharepointBarShown = true;
    }

    var args =
        { ShowSharepointBar: !isSharepointBarShown, SetCookie: true };
    Akumina.Digispace.AppPart.Eventing.Publish('/loader/handlesharepointbar/', args);
}