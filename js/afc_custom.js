/**
 * @file
 * This file contains all jQuery for the forms used in afc_custom
 */

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

		}
    }
  };
})(jQuery);
