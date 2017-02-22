/**
 * @file
 * This file contains all jQuery for the forms used in afc_custom
 */


function timerIncrement() {
//1 = 15s
	idleTime = idleTime + 1;
	//console.log(idleTime);

	if (idleTime > 20) { // 45 seconds
		console.log('reloading');
		//window.location.reload();
		//window.scrollTo(0, 0);
	}
}
var idleTime = 0;
(function ($) {
	  Drupal.behaviors.ec_app = {
		attach: function (context, settings) {
			
		$(window).load(function() {
			console.log('Afc Custom Module loaded');
			//Zero the idle timer on mouse movement.
			$(this).mousemove(function(e) {
				idleTime = 0;
			});
			$(this).keypress(function(e) {
				idleTime = 0;
			});
		});


		//Shoutout page scripts and handlers
		if ($('#shoutout-page-main-content').length > 0) {

			if ($('#ajax-msg').length > 0) {
				$('#ajax-msg').addClass('bounce');
				$('#ajax-msg').delay(4000).fadeOut('slow');
				window.setTimeout(function(){location.reload()},4100);

				//onclick of huddle news
				$('#ajax-msg').click(function() {
					$('#ajax-msg').fadeOut('slow');
					location.reload();
					window.scrollTo(0, 0);
				});

			}

			//
			$('.shout-buttons').click(function() {
				console.log(1);

			});

			//onclick of search employees
			$('#employee-search-icon').click(function() {
				if ($('#employee-search-field').is(":hidden")) {
					$('#employee-search-field').fadeIn('slow');
				} else {
					$('#employee-search-field').fadeOut('slow');
				}
			});


			//onclick of huddle news
			$('.view.view-shoutout-huddle-news .views-row').click(function() {
				if ($(this).hasClass('zoomin')) {
					$(this).removeClass('zoomin');
				} else {
					$(this).addClass('zoomin');
				}
			});

			//IDLE COUNTER
			//Increment the idle time counter every minute.
			var idleInterval = setInterval(timerIncrement, 15000); // 1 minute 60000

			//shout stats search icon button
			$('#shout-search-icon').once().click(function() {
				if ($('div.view-shoutout-comment-list div.view-filters').is(":hidden")) {
					$('div.view-shoutout-comment-list div.view-filters').fadeIn('slow');
				} else {
					$('div.view-shoutout-comment-list div.view-filters').fadeOut('slow');
				}

			});

			//popups
			$('.popup-shoutout-info').once().click(function() {
				console.log('popup');
				$( "#ajax-response" ).after('<div id="popup-shoutout-info" style="display:none;">Enter your employee# so we know who the shoutout is from</div>');
				$( "#ajax-response" ).after('<div id="popup-shoutout-choose" style="display:none;">Choose a response</div>');
				$( "#ajax-response" ).after('<div id="popup-shoutout-submit" style="display:none;">Then click submit</div>');

				$('#popup-shoutout-info').delay(0050).fadeIn('slow');
				$('#popup-shoutout-info').delay(1700).fadeOut('slow');

				$('#popup-shoutout-choose').delay(2200).fadeIn('slow');
				$('#popup-shoutout-choose').delay(2500).fadeOut('slow');

				$('#popup-shoutout-submit').delay(3000).fadeIn('slow');
				$('#popup-shoutout-submit').delay(3100).fadeOut('slow');
				$('form#webform-client-form-84 input.webform-submit').toggle( "bounce", { times: 3 }, "slow" );

			});


		}
    }
  };
})(jQuery);
