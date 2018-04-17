// Akumina Content Explorer JS

//Init Foundation
$(document).foundation();

$(document).ready(function() {
	
	//Equal Heights
    $('.ak-explorer-wrapper .ak-3-col, .ak-explorer-wrapper .ak-2-col').equalHeights();
    $(window).load(function () {
        $('.ak-explorer-wrapper .ak-3-col, .ak-explorer-wrapper .ak-2-col').equalHeights();
    });
       //Check the column heights again on window resize
       $(window).resize(function () {
           //alert('BLAH');
         $('.ak-explorer-wrapper .ak-3-col, .ak-explorer-wrapper .ak-2-col').equalHeights();
       });
	   
	//Date picker
	$( ".ak-datepicker" ).each(function( ) {
		$( ".ak-datepicker" ).datepicker({
		  showOn: "both",
		  buttonImage: "images/ak-icon-date.png",
		  buttonImageOnly: true
		});
	});
	$( ".ak-spinner-milliseconds" ).each(function( ) {
		$( ".ak-spinner-milliseconds" ).spinner({ max: 5000, min: 500, step: 100 });
	});
	
	$( ".ak-spinner-seconds" ).each(function( ) {
		$( ".ak-spinner-seconds" ).spinner({ max: 15, min: 1 });
	});
	
	$( ".ak-spinner-days" ).each(function( ) {
		$( ".ak-spinner-days" ).spinner({ max: 352, min: 1 });
	});
	
	$( ".ak-spinner-weeks" ).each(function( ) {
		$( ".ak-spinner-weeks" ).spinner({ max: 52, min: 1 });
	});
	$( ".ak-spinner-months" ).each(function( ) {
		$( ".ak-spinner-months" ).spinner({ max: 12, min: 1 });
	});
	
	$( ".ak-buttonset-row" ).each(function( ) {
		$( ".ak-buttonset-row" ).buttonset();
	});
	
	/*$( ".ak-dialog-trigger" ).each(function( ) {
		$( ".ak-dialog" ).dialog({
		  autoOpen: false,
		  modal: true,
		  width:700,
		  
		});
		$(".ak-dialog").dialog('option', 'position', $(".ak-dialog").dialog('option', 'position'));
	 
		$(".ak-dialog-trigger").click(function(e) {
		  $(".ak-dialog").dialog( "open" );
		  e.preventDefault();
		  return false;
		});
	});
	
	
	$( "#dialog" ).dialog({
      autoOpen: false,
      height: 140,
	  width:600,
      modal: true
    });
 
    $( "#opener" ).click(function() {
      $( "#dialog" ).dialog( "open" );
	  e.preventDefault();
	  return false;
    });*/
	
	//Comments & Replies
	$('.ak-comment-replies').hide();
	$('.ak-comment-reply').each(function() {
		$(this).click(function(e) {
		  $(this).closest('.ak-comment-detail').siblings('.ak-comment-replies').slideToggle();
		 e.preventDefault();
		});
	});
	
	//Content Explorer Search
	$('.ak-latest-content .ak-search-box').focus(function () {
	    var searchResults = $('.ak-latest-content .ak-content-list-results');
	    if ($('.ak-latest-content .ak-content-list-results li').length > 0)
	    {
	        $(searchResults).show();
	    }
	    $(document).bind('focusin.ak-content-list-results click.ak-content-list-results', function (e) {
		  if ($(e.target).closest('.ak-content-list-results, .ak-latest-content .ak-search-box').length) return;
		  $(document).unbind('.ak-latest-content .ak-content-list-results');
		  searchResults.fadeOut('medium');
	  });
	});
	$('.ak-content-list-results').hide();

	// Sites dropdown menu 
	$('.ak-main-menu-trigger').click(function() {
		$('.ak-main-menu-drop').fadeToggle('fast');
	});
	$('.ak-main-menu-drop li a').click(function() {
		$('.ak-main-menu-drop').fadeOut('fast');
	});

	  //Site explorer checkbox functions
  //On change of a checkbox:
  $('.ak-sites-explorer-list input[type="checkbox"]').change(function() {
  		//deselect all other checkboxes:
  		$('.ak-sites-explorer-list input[type="checkbox"]').not(this).prop('checked', false).parent().removeClass('ak-selected');

  		//If this is checked, add the selected class:
  		if ($(this).is(':checked')) {
  			$(this).parent().addClass('ak-selected');
  		}
  		//If this is NOT checked, remove the selected class:
  		else {
  			$(this).parent().removeClass('ak-selected');
  		}
  });
  //If the parent LI is clicked, replicate the checkbox change functionality:
  $('.ak-sites-explorer-list li').click(function(evt) {
  	//Make sure the click target is not a checkbox
  	if (evt.target.type !== 'checkbox', 'label') {

  		//deselect all other checkboxes:
  		$('.ak-sites-explorer-list input[type="checkbox"]').not(this).prop('checked', false).parent().removeClass('ak-selected');

  		//If this is checked, add the selected class:
	  	if ($(this).children('input[type="checkbox"]').is(':checked')) {
	  		$(this).children('input[type="checkbox"]').prop('checked', false);
	  		$(this).removeClass('ak-selected');
	  	}
	  	//If this is NOT checked, remove the selected class:
	  	else if ($(this).children('input[type="checkbox"]').not(':checked')) {
	  		$(this).children('input[type="checkbox"]').prop('checked', true);
	  		$(this).addClass('ak-selected');
	  	}
	  }

  });

	
});