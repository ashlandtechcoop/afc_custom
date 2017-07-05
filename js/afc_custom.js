/**
 * @file
 * This file contains all jQuery for the forms used in afc_custom
 */

//Idle timer - but we are not using it
function updateTextInput(val) {
	document.getElementById('edit-submitted-greenway-miles').value=val;
	document.getElementById('rangeLabel').innerHTML=val;
}
function timerIncrement() {
//1 = 15s
	idleTime = idleTime + 1;
	//console.log(idleTime);

	if (idleTime > 20) { // 45 seconds
		//console.log('reloading');
		//window.location.reload();
		//window.scrollTo(0, 0);
	}
}
var idleTime = 0;


//Get query string params function
var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

//BEGIN JQUERY DRUPAL BEHAVIORS
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


		//name tag request form webform 29. Display select box if color background is selected
		//if ($('#edit-submitted-background-options-1').length > 0) {
		if ($('#edit-submitted-background-options').length > 0) {
			$('#edit-submitted-background-options input').click(function() {
				if($('#edit-submitted-background-options-1').is(':checked')) {
					$('.color-options').fadeIn('slow');
				} else {
					$('.color-options').fadeOut('fast');
				}
			});

			//if ($('input#edit-submitted-background-options-1').attr('checked',true)) {
            //
			//}
			//
		}

		//regarding shoutout board auto login
		//nothing to see here folks, move along
		if ($('.afc-auto').length > 0) {
			var tech = getUrlParameter('jq');
			if (tech) {
				$('.afc-auto').val(tech);
				$('form#user-login').submit();
			}
		}


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
			var wit_clicked = false;
			var wt = 0;
			$('#what-is-it').click(function() {
				$('#shoutout-popup0').removeClass('hide-field').addClass('bounceInDown animated');
				setTimeout(function(){
					$("#check-out-prizes").addClass("pulse animated do-twice").delay(3000).queue(function(next){
						$("#check-out-prizes").removeClass("pulse animated do-twice");
						$("#check-out-prizes").dequeue();
					});
				}, 1500);
				wit_clicked = true;
				wt = 1;
			});

			//reset the click counter to 1 if clicking on this div
			$('#shoutout-popup0').click(function() {
				wit_clicked = true;
				wt = 1;
			});

			//SHOW ME THE PRIZES
			$('#check-out-prizes').click(function() {
				$('#shoutout-pg').addClass('bounceOutUp animated').delay(500).queue(function(next){
					$('#check-out-prizes').hide().animate({height: "0px"}, 500);
					$('#shoutout-pg').hide().animate({height: "0px"}, 500);
					$('#shoutout-pg').dequeue();
				});
				$('#prizes').removeClass('hide-field').addClass('bounceInUp animated');
				//$("#check-out-prizes").addClass("pulse animated do-twice").delay(3000).queue(function(next){
				//	$("#check-out-prizes").removeClass("pulse animated do-twice");
				//});
			});


			$(".prize-row").mouseover(function() {
				$(this).find('.table-cell-img').addClass('pulse animated');
			});
			$(".prize-row").mouseout(function() {
				$(this).find('.table-cell-img').removeClass('pulse animated');
			});


			//GOT IT BUTTON POPUP0
			$('#prizes-got-it').click(function() {
				//$('#prizes').removeClass('hide-field').addClass('bounceInUp animated');
				$('#shoutout-popup0').addClass('bounceOutDown animated').delay(2000).queue(function(next) {
					$('#shoutout-popup0').removeClass('bounceInDown bounceOutDown animated');
					$('#shoutout-popup0').addClass('hide-field');
					$('#prizes').removeClass('bounceInUp animated').addClass('hide-field');
					//set these back to auto height
					//$('#check-out-prizes').css({height:'auto'});
					//$('#shoutout-pg').css({height:'auto'});
					$('#shoutout-pg').removeClass('bounceOutUp animated');
					$('#shoutout-pg').removeAttr('style');
					$('#shoutout-pg').removeAttr('class');

					$('#check-out-prizes').removeAttr('style');
					//$('#check-out-prizes').removeAttr('class');
					$('#shoutout-popup0').dequeue();
				});

			});

			//refresh button
			$('.main-refresh-icon').click(function() {
				window.location.reload();
			});

			//close button
			$('#close-button').click(function() {
				$('#shoutout-popup0').addClass('bounceOutDown animated').delay(2000).queue(function(next) {
					$('#shoutout-popup0').removeClass('bounceInDown bounceOutDown animated');
					$('#shoutout-popup0').addClass('hide-field');
					$('#prizes').removeClass('bounceInUp animated').addClass('hide-field');
					//set these back to auto height
					//$('#check-out-prizes').css({height:'auto'});
					//$('#shoutout-pg').css({height:'auto'});
					$('#shoutout-pg').removeClass('bounceOutUp animated');
					$('#shoutout-pg').removeAttr('style');
					$('#shoutout-pg').removeAttr('class');

					$('#check-out-prizes').removeAttr('style');
					//$('#check-out-prizes').removeAttr('class');
					$('#shoutout-popup0').dequeue();
				});
			});

			//"SHOW ME" ON CLICK POPUPS
			var nar = false; //true = show me was clicked
			var pc = 0;
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
						$('#shoutout-popup2').css({top: spos.top-138 + 'px', left: spos.left-100 + 'px', position:'absolute'});
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
						pc = 1;
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
								$('#employee-search-field').fadeOut('slow');
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
								$('#employee-search-field').fadeOut('slow');
								$('#shoutout-popup1').addClass('bounceOutRight animated hide-field').queue(function(next){
									$('#shoutout-popup1').removeClass("bounceInRight bounceOutRight animated");
									$('.front-end').parent('details').removeClass('greyed-out');
									next();
								});
								nar = false;
							}
						}
					});

			var dept_clicked = false;
			var dc = 0;
			//Click Employee Name on Department Listing Dropdowns
			$('details.dept-group').click(function() {
				dept_clicked = true;
				dc = 1;
				console.log('clicked' + dc);
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

			//Job Posting on Click of Main Div
			$('.dark-line').click(function(event) {
				//close other dialogs and such
				$("#modal-dialog").dialog('close'); //close other dialogs if open
				$('.dark-line').removeClass('dark-line-click');

				$(this).addClass('dark-line-click');
				var uurl = $(this).find("[id^=job-url-to-file-]").html();
				$(this).find("[id^=job-url-to-file-]").after('<div id="modal-dialog"><iframe width="100%" height="100%" src="'+ $.trim(uurl)+'"></iframe></div>');

				$("#modal-dialog").dialog({modal: true, width: 900,height:1000, close: function() {
					$('.dark-line').removeClass('dark-line-click');
					$('#job-posting-popup').fadeOut('fast');
				}, dialogClass: 'pdf-job-dialog',resizable: false, draggable: false, show:{
					effect: 'fade',
					duration: 200 //at your convenience
				},
					hide: {
						effect: 'fade',
						duration: 200 //at your convenience
					}});

				//open the how to apply popup
				$('#job-posting-popup').fadeIn('fast');
				var nav = $('.pdf-job-dialog');
				if (nav.length) {
					var off = $('.pdf-job-dialog').offset();
					$('#job-posting-popup').css({top: '100px', right: '10px', position:'fixed'});
					//$('#job-posting-popup').css({top: off.top + 'px', left: off.left + 'px', position:'absolute'});
				}

			});

			//Job PDF POPUP GOT IT
			$('#job-got-it').click(function() {
				//check and remove popup styles
				$('#job-posting-popup').fadeOut('fast');
			});

			//Job Openings shoutout buttons scroll to anchor
			$('#jo a').click(function() {
				$('html, body').animate({
					scrollTop: $( $(this).attr('href') ).offset().top
				}, 500);
				return false;
			});

			//onclick of search employees
			$('#employee-search-icon1').once().click(function() {
				if ($('#employee-search-field').is(":hidden")) {
					$('#employee-search-field').fadeIn('slow');
					$("#employee-search").focus();
				} else {
					$('#employee-search-field').fadeOut('slow');
				}
			});


			//IDLE COUNTER Increment the idle time counter every minute.
			var idleInterval = setInterval(timerIncrement, 15000); // 1 minute 60000
			//shout stats search icon button

			//shout stats search icon button
			$('#shout-search-icon').once().click(function() {
				if ($('div.view-shoutout-comment-list div.view-filters').is(":hidden")) {
					$('div.view-shoutout-comment-list div.view-filters').fadeIn('slow');
					$('#edit-field-full-name-value-shout-out').focus();
				} else {
					$('div.view-shoutout-comment-list div.view-filters').fadeOut('slow');
				}

			});

			//Each shoutout comment add the animation classes on page load
			$(".shoutout-comment-row").once().each(function(index) {
				$(this).delay(90*index).fadeIn(300).addClass("bounceIn animated").queue(function(next){
					$(this).removeClass("bounceIn animated");
					next();
				});
			});

			//Bounce in effects to shoutout comments
			//$(".shoutout-comment-row").once().each(function(index) {
			//	$(this).delay(90*index).fadeIn(300).addClass("bounceIn animated").queue(function(next){
			//		$(this).removeClass("bounceIn animated");
			//		next();
			//	});
			//});

			//Popups for shoutout buttons greenway to work -  job openings - ideas
			var they_clicked = false;
			var shit = 0;
			$('#help-me-shoutout-btns').click(function() {

				//get the data id which matches the id of the div to unhide and position over
				var id1 = $('#sbp-1').attr('data-id');
				var id2 = $('#sbp-2').attr('data-id');
				var id3 = $('#sbp-3').attr('data-id');

				var off1 = $('#'+id1).offset();
				var off2 = $('#'+id2).offset();
				var off3 = $('#'+id3).offset();

				$('#sbp-1').css({top: off1.top + 70 +'px', left: '40px', position:'absolute'});
				$('#sbp-2').css({top: off2.top - 215 +'px', left: off2.left -160 +'px', position:'absolute'});
				$('#sbp-3').css({top: off3.top +30 + 'px', left: off3.left + 190 + 'px', position:'absolute'});

				$('#sbp-1').fadeIn('slow').addClass('pulse animated');
				$('#sbp-2').delay(600).fadeIn('slow').addClass('pulse animated');
				$('#sbp-3').delay(1000).fadeIn('slow').addClass('pulse animated');
				they_clicked = true;
				shit = 1;
			});
			$("#sbp-1, #sbp-2, #sbp-3").click(function(){
				they_clicked = true;
				shit = 1;
			});

			$(".popups-close").click(function(){
				$('details.dept-group').removeAttr("open");
			});



			//remove animations if document is clicked a second time for various popups
			$(document).click(function() {
				//they_clicked is for shoutout button popups
				if ((they_clicked = true) && (shit == 2)) {
					$('#sbp-1').fadeOut('fast');
					$('#sbp-2').fadeOut('fast');
					$('#sbp-3').fadeOut('fast');
					they_clicked=false;
					shit = 0;
				}
				if ((they_clicked == true) && (shit == 1)) {
					shit = shit +1;
				}

				//zoomin_clicked is for the zoomin class on click
				if ((zoomin_clicked == true) && (cc == 2)) {
					$('.view.view-shoutout-huddle-news .views-row').removeClass('zoomin'); //remove zoomin class
					zoomin_clicked=false;
					cc = 0;
				}
				if ((zoomin_clicked == true) && (cc == 1)) {
					cc = cc +1;
				}

				//menu overlay cases
				if ((menu_clicked == true) && (hey == 2)) {
					$("#menu-wrapper").animate({left:'-250px'}, 500);
					$('#menu-close').removeClass('pulse animated do-twice');

					menu_clicked =false;
					hey = 0;

				}
				if ((menu_clicked  == true) && (hey == 1)) {
					hey = hey +1;
				}

				//dept-group click on employee name in dept list
				if ((dept_clicked == true) && (dc == 2)) {
					$('details.dept-group').removeAttr("open");
					dept_clicked =false;
					dc = 0;

				}
				if ((dept_clicked  == true) && (dc == 1)) {
					dc = dc +1;
				}

				//WHAT IS IT click on if clicked away from
				if ((wit_clicked == true) && (wt == 2)) {
					if ($('#shoutout-popup0').hasClass('show-field')) {
						$('#shoutout-popup0').removeClass('show-field').addClass('bounceOutTop animated');
					} else {
						$('#shoutout-popup0').addClass('bounceOutUp animated');
						$('#shoutout-popup0').removeClass().addClass('hide-field');
					}
					//$('#shoutout-popup0').removeClass('bounceInDown').addClass('bounceOutTop animated');
					wit_clicked =false;
					wt = 0;

				}
				if ((wit_clicked  == true) && (wt == 1)) {
					wt = wt +1;
				}

				//SHOW ME Shoutout popups if you click off of them
				if ((nar == true) && (pc == 2)) {
					if ($('.front-end').parent('details').hasClass('greyed-out')) {
						$('#shoutout-popup2').attr('style','display:none;');
						$('#employee-search-field').removeClass('swing animated');
						if ($("#employee-search-field").is(":focus")) {

						} else {
							$('#employee-search-field').fadeOut('slow');
						}
						$('#shoutout-popup1').addClass('bounceOutRight animated hide-field').queue(function(next){
							$('#shoutout-popup1').removeClass("bounceInRight bounceOutRight animated");
							$('.front-end').parent('details').removeClass('greyed-out');
							next();
							$('#shoutout-popup1').dequeue();
						});
						nar =false;
						pc = 0;
					}
				}
				if ((nar  == true) && (pc == 1)) {
					pc = pc +1;
				}
			});
			//end popups or shoutout buttons. the document on click dismisses the popups is they_clicked = true



			//MENU NAVIGATION ON CLICK DISPLAY OVERLAY MENU. MENU CODE IS IN AFC_CUSTOM.MODULE IN HOOK_PREPROCESS_NODE
			var menu_clicked = false;
			var hey = 0;
			$("#menu-btn").click(function(){
				$("#menu-wrapper").animate({left:'0px'}, 500);
				$('#menu-close').addClass('pulse animated do-twice');
				menu_clicked = true;
				hey = 1;
			});
			//if they click on the menu again don't dismiss it this way
			$("#menu-wrapper").click(function(){
				menu_clicked = true;
				hey = 1;
			});
			//Menu close overlay
			$("#menu-close").click(function(){
				$("#menu-wrapper").animate({left:'-250px'}, 500);
				$('#menu-close').removeClass('pulse animated do-twice');
				menu_clicked = false;
				hey = 0;
			});

			//HUDDLE NEWS ON CLICK SHOUTOUT BOARD
			zoomin_clicked=false;
			cc = 0;
			$('.huddle-news-row').click(function(event) {
				event.stopImmediatePropagation(); //running multiple times after a modal form for some reason. need this
				if ($(this).hasClass('zoomin')) {
					//switch the trimmed with the full
					var t = $(this).find('.huddle-news-body-2').html();
					var o = $(this).find('.huddle-news-body-1').html();
					$(this).find('.huddle-news-body-1').html(t);
					$(this).find('.huddle-news-body-2').html(o);
					$(this).removeClass('zoomin');
				} else {
					var two = $(this).find('.huddle-news-body-2').html();
					var one = $(this).find('.huddle-news-body-1').html();
					$(this).find('.huddle-news-body-1').html(two);
					$(this).find('.huddle-news-body-2').html(one);
					$(this).addClass('zoomin');
					zoomin_clicked = true; //this is for the document(click) function down below
					cc = 1;
				}
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
