/**
 * @file
 * This file contains all jQuery for the forms used in afc_custom
 */


function timerIncrement() {

	idleTime = idleTime + 1;
	console.log(idleTime);
	if (idleTime > 2) { // 20 minutes
		console.log('12 seconds');
		window.location.reload();
	}
}
var idleTime = 0;
(function ($) {
	  Drupal.behaviors.ec_app = {
		attach: function (context, settings) {
			
		$(window).load(function() {
			console.log('Afc Custom Module loaded');


		});


		//Shoutout page scripts
		if ($('#shoutout-page-main-content').length > 0) {

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
			var idleInterval = setInterval(timerIncrement, 6000); // 1 minute 60000
			console.log(0);
			//Zero the idle timer on mouse movement.
			$(this).mousemove(function(e) {
				idleTime = 0;
				console.log(1);
			});
			$(this).keypress(function(e) {
				idleTime = 0;
				console.log(2);
			});

		}
    }
  };
})(jQuery);
