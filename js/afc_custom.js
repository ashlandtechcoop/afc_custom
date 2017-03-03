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

			//details[i].open = false;
			//$('details.dept-group').click(function() {
			//	$("details.dept-group").each(function(index) {
			//		if ($(this).attr('open')) {
			//			console.log('its true');
			//			$(this).attr('open', false);
			//		} else {
			//			console.log('its not ture');
			//		}
            //
			//	});
			//	$(this).attr('open', true);
			//});
			$('#what-is-it').click(function() {
				$('#shoutout-popup0').addClass('show-field item animated bounceInLeft');

			});
			$('#make-shoutout').click(function() {
				$('#shoutout-popup1').fadeIn(2000);

			});


			//display ajax messages after posting shoutout
			if ($('#ajax-msg').length > 0) {
				$('#ajax-msg').addClass('bounce');
				$('#ajax-msg').delay(4000).fadeOut('slow');
				window.setTimeout(function(){location.reload()},4100);

				//onclick of ajax response
				$('#ajax-msg').click(function() {
					$('#ajax-msg').fadeOut('slow');
					location.reload();
					window.scrollTo(0, 0);
				});

			}

			//
			$('.shout-buttons').click(function() {

			});

			//onclick of search employees
			$('#employee-search-icon').once().click(function() {
				if ($('#employee-search-field').is(":hidden")) {
					$('#employee-search-field').fadeIn('slow');
					$("#employee-search").focus();
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
			$('#reset').once().click(function() {
				if ($('div.view-shoutout-comment-list div.view-filters').is(":hidden")) {
				} else {
					$('div.view-shoutout-comment-list div.view-filters').fadeOut('slow');
					$('#reset').remove();
				}
			});
			//shout stats search icon button
			$('#shout-search-icon').once().click(function() {
				if ($('div.view-shoutout-comment-list div.view-filters').is(":hidden")) {
					$('div.view-shoutout-comment-list div.view-filters').fadeIn('slow');
					$('#edit-field-full-name-value-shout-out').focus();
					if ($('#reset').length <= 0) {
						$('.view-shoutout-comment-list').before('<button id="reset">Reset</button>');
					}

				} else {
					$('div.view-shoutout-comment-list div.view-filters').fadeOut('slow');
					$('#reset').remove();
				}

			});

			//onclick of shoutout comment
			$('.shoutout-comment-row').click(function(e) {

				if ($(this).hasClass('comment-hover')) {
					//make it small
					$(this).removeClass('comment-hover');
					$(".shoutout-comment-row").each(function(index) {
						$(this).removeClass("gray-out");
						//$(this).removeClass("bounceIn animated");
					});
					$(this).css({position:'inherit'});
				} else {
					//make it big
					//before you make it big make all of them small
					$(".shoutout-comment-row").each(function(index) {
						$(this).removeClass("comment-hover");
						$(this).css({position:'inherit'});
					});

					//set position and assign gray out class to everything else
					$(this).css({top: e.pageY + 'px', left: e.pageX-340 + 'px', position:'absolute'});
					$(".shoutout-comment-row").each(function(index) {
						$(this).addClass("gray-out");
					});
					//assign class to focus div
					$(this).addClass('comment-hover');
					$(this).removeClass('gray-out');



				}

			});

			//$( ".shoutout-comment-row" ).each(function( index ) {
			//	$(this).addClass("bounceIn animated").delay(2000).queue(function(next){
			//		$(this).removeClass("bounceIn animated");
			//		next();
			//	});
			//	//$(this).delay(5000).addClass('bounceIn animated');
			//	//$(this).removeClass('bounceIn animated');
            //
			//});

			$(".shoutout-comment-row").each(function(index) {
				$(this).delay(90*index).fadeIn(300).addClass("bounceIn animated").queue(function(next){
					$(this).removeClass("bounceIn animated");
					next();
				});
			});
			//gradient shine
			//$('.shout-header2').gradientify({
			//	gradients: [
			//		{ start: [0,0,0], stop: [50,50,50] },
			//		{ start: [15,15,15], stop: [0,0,0] },
			//		{ start: [0,0,0], stop: [10,10,10] }
			//	]
			//});

			//activate bootstrap tooltips
			$(function () {
				$("[rel='tooltip']").tooltip();
			});


		}
    }
  };
})(jQuery);
