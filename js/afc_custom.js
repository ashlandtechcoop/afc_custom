/**
 * @file
 * This file contains all jQuery for the forms used in afc_custom
 */


function timerIncrement() {
//1 = 15s
	idleTime = idleTime + 1;

	if (idleTime > 2) { // 45 seconds
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
				console.log(1);
			});
			$(this).keypress(function(e) {
				idleTime = 0;
				console.log(2);
			});
		});


		//Shoutout page scripts
		if ($('#shoutout-page-main-content').length > 0) {

			if ($('#ajax-msg').length > 0) {
				$('#ajax-msg').addClass('bounce');
				$('#ajax-msg').delay(4000).fadeOut('slow');
				window.setTimeout(function(){location.reload()},4100);

				//onclick of huddle news
				$('#ajax-msg').click(function() {
					$('#ajax-msg').fadeOut('slow');
					location.reload();
				});

			}


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



		}
    }
  };
})(jQuery);
