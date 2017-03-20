/**
 * @file
 * This file contains all jQuery for the forms used in afc_custom
 */

function updateTextInput(val) {
	document.getElementById('edit-submitted-greenway-miles').value=val;
	document.getElementById('rangeLabel').innerHTML=val;
}
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

			//When a details is clicked collapse all others
			$('details').click(function (event) {
				$('details').not(this).removeAttr("open");
			});

			//Add primary animations to major blocks when page first loads
			$(document).ready(function(){

				//only run the animation once by checking for processed class
				if ($('.processed').length == 0) {
					//add animation classes
					$('.shout-col-1').addClass('fadeInLeftBig animated');
					$('.shout-col-2').addClass('bounceInDown animated');
					$('.shout-col-3').addClass('bounceInUp animated');
					$('.shout-col-4').addClass('bounceInRight animated');
					$('#make-shoutout1').addClass('bounceInDown animated');

					//remove animation classes
					setTimeout(function() {
						$('.shout-col-1').removeClass("fadeInLeftBig animated").addClass('processed');
						$('.shout-col-2').removeClass("bounceInDown animated").addClass('processed');
						$('.shout-col-3').removeClass("bounceInUp animated").addClass('processed');
						$('.shout-col-4').removeClass("bounceInRight animated").addClass('processed');
						$('#make-shoutout1').removeClass("bounceInDown animated").addClass('processed');
					}, 1000);
				}
			});

			//"What is it?" POPUP BUTTON
			$('#what-is-it').click(function() {
				$('#shoutout-popup0').removeClass('hide-field').addClass('item bounceInDown animated');
			});


			//"SHOW ME" ON CLICK POPUPS
			var nar = false; //true = show me was clicked
			$('#make-shoutout1').once().click(function() {
				if ($('#shoutout-popup1').hasClass('hide-field')) {

					//show first popup
					var dpos = $('.front-end').parent('details').position();
					$('#shoutout-popup1').css({top: dpos.top-30 + 'px', left: dpos.left+530 + 'px', position:'absolute'});
					$('#shoutout-popup1').removeClass('hide-field').addClass('bounceInRight animated');

					$('.front-end').parent('details').addClass('greyed-out');
					$('details').not(this).removeAttr("open");

					//show second popup and que the employee search field display
					//get the position of the search icon first
						var spos = $('#employee-search-icon1').position();
						$('#shoutout-popup2').css({top: spos.top-110 + 'px', left: spos.left-215 + 'px', position:'absolute'});
					$('#shoutout-popup2').delay(2000).fadeIn('fast').queue(function(next){

						$('#shoutout-popup2').removeClass('hide-field');
						//display the employee name search
						if ($('#employee-search-field').is(":hidden")) {

							$('#employee-search-field').fadeIn('slow');
							$('#employee-search-field').addClass('swing animated');

							//highlight the frontend summary and drop down the employee search
							var dpos = $('.front-end').parent('details').position();-
							$('#shoutout-popup1').css({top: dpos.top-30 + 'px', left: dpos.left+530 + 'px', position:'absolute'});
							$("#employee-search").focus();
							$('#shoutout-popup2').dequeue();
						} else {

							$('#employee-search-field').addClass('swing animated');
							//highlight the frontend summary and drop down the employee search
							var dpos = $('.front-end').parent('details').position();
							$('#shoutout-popup1').css({top: dpos.top-30 + 'px', left: dpos.left+530 + 'px', position:'absolute'});
							$("#employee-search").focus();
							$('#shoutout-popup2').dequeue();
						}

						nar = true;
					});

				} else {
					//if they click SHOW ME again, hide all the popups
					$('#shoutout-popup2').fadeOut('fast');
					$('#shoutout-popup2').addClass('hide-field');
					$('#shoutout-popup1').addClass('bounceOutRight animated hide-field').queue(function(next){
						$('#shoutout-popup1').removeClass("bounceInRight bounceOutRight animated");
						$('#employee-search-field').fadeOut('slow');
						$('#employee-search-field').removeClass('swing animated');
						$('.front-end').parent('details').removeClass('greyed-out');
						next();
					});
					nar = true;
				}
			});

					//SHOW ME POPUPS - remove popups if someone starts typing
					$("#employee-search").keypress(function() {
						//check and remove popup styles IF true
						if ($("#employee-search").val().length == 1 && nar==true) {
							if ($('.front-end').parent('details').hasClass('greyed-out')) {
								$('#shoutout-popup2').attr('style','display:none;');
								$('#employee-search-field').removeClass('swing animated');
								$('#shoutout-popup1').addClass('bounceOutRight animated hide-field').queue(function(next){
									$('#shoutout-popup1').removeClass("bounceInRight bounceOutRight animated");
									$('.front-end').parent('details').removeClass('greyed-out');
									next();
								});
								nar = false;
							}
						}
					});

					//SHOW ME POPUPS remove popups if GOT IT is clicked
					$('#got-it').click(function() {
						//check and remove popup styles IF true
						if (nar==true) {
							if ($('.front-end').parent('details').hasClass('greyed-out')) {
								$('#shoutout-popup2').attr('style','display:none;');
								$('#employee-search-field').removeClass('swing animated');
								$('#shoutout-popup1').addClass('bounceOutRight animated hide-field').queue(function(next){
									$('#shoutout-popup1').removeClass("bounceInRight bounceOutRight animated");
									$('.front-end').parent('details').removeClass('greyed-out');
									next();
								});
								nar = false;
							}
						}
					});

					//SHOW ME POPUPS CLOSE IF AN EMPLOYEE NAME IS CLICKED
					$('.dept-group a').click(function() {
						//nar true = popups are on
						if (nar==true) {
							if ($('.front-end').parent('details').hasClass('greyed-out')) {
								$('#shoutout-popup2').attr('style','display:none;');
								$('#employee-search-field').removeClass('swing animated');
								$('#shoutout-popup1').addClass('bounceOutRight animated hide-field').queue(function(next){
									$('#shoutout-popup1').removeClass("bounceInRight bounceOutRight animated");
									$('.front-end').parent('details').removeClass('greyed-out');
									next();
								});
								nar = false;
							}
						}
					});


			//close button
			$('#close-button').click(function() {
				if ($(this).parent('div').hasClass('show-field')) {
					$(this).parent('div').removeClass('show-field').addClass('bounceOutTop animated');
				} else {
					$(this).parent('div').addClass('bounceOutUp animated');
				}

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

			//onclick of search employees
			$('#employee-search-icon1').once().click(function() {
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

			//IDLE COUNTER Increment the idle time counter every minute.
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

			//Each shoutout comment add the animation classes on page load
			$(".shoutout-comment-row").once().each(function(index) {
				$(this).delay(90*index).fadeIn(300).addClass("bounceIn animated").queue(function(next){
					$(this).removeClass("bounceIn animated");
					next();
				});
			});


			$(".shoutout-comment-row").once().each(function(index) {
				$(this).delay(90*index).fadeIn(300).addClass("bounceIn animated").queue(function(next){
					$(this).removeClass("bounceIn animated");
					next();
				});
			});

			//activate bootstrap tooltips
			$(function () {
				$("[rel='tooltip']").tooltip();
			});

		} //end shoutout page check


			//Green way to work webform animated for hover of circular images
			$('.form-item-submitted-transportation-method img').hover(function() {
				$(this).addClass('pulse animated');
				$(this).delay(1000).queue(function(next){
					$(this).removeClass('pulse animated');
					next();
				});
			});


			//Function for value slider on Green way to work form
			var rangeSlider = function(){
				var slider = $('.range-slider'),
					range = $('.range-slider__range'),
					value = $('.range-slider__value');

				slider.each(function(){

					value.each(function(){
						var value = $(this).prev().attr('value');
						$(this).html(value);
					});

					range.on('input', function(){
						$(this).next(value).html(this.value);
					});
				});
			};

			rangeSlider();
			var rangeHTML = '<div class="rangeDesc">Appx. distance</div>' +
							'<div class="rangeCont row">' +
							'<div class="rangeCell cell"><input id="rangeInput" type="range" name="rangeInput" min="0" max="10" step="0.25" value="0.25" onchange="updateTextInput(this.value);"></div>' +
							'<div class="rangeLabelCell cell"><div id="rangeLabel">.25</div><div class="rangeMiles">miles</div></div>' +
							'</div>';

			$('.range-slider-target').before(rangeHTML);

    }
  };
})(jQuery);
