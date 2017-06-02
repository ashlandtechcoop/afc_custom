
(function ($) {
    Drupal.behaviors.ShoutPopups = {
        attach: function (context, settings) {

//WHY ARE WE DOING THIS?
            //BECAUSE THE MODAL FORM CANNOT ACCESS THE PRIMARY JQUERY FILE AND WE CANNOT ACCESS THE MODAL ELEMENTS DOM
            //THIS JS FILE IS LOADED DIRECTLY ONTO THE MODAL FORM SO JS HERE CAN TARGET THIS MODAL FORM ELEMENTS

            if ($("form#webform-client-form-84").length > 0) {
                //$('form#webform-client-form-84').append('<div id="help-me" class="cursor help-me"><img src="/sites/all/modules/afc_custom/images/question_white1.png" width="27px"></div>');
                var pooped = false;
                $('form#webform-client-form-84').append('<div id="help-me" class="cursor help-me-black"><img src="/sites/all/modules/afc_custom/images/question_white1.png" width="27px"></div>');
                $('#help-me').click(function (event) {
                    if (pooped != true) {
                        pooped = true;
                        //POPUPS INSTRCUTIONS FOR SUBMITTING A SHOUTOUT
                        var pos_info = jQuery('#edit-submitted-employee-id-from').position();
                        var pos_form = jQuery('.modal-scroll').position();
                        var info_top = pos_form.top + 30;
                        var choose_top = pos_form.top + 130;
                        var submit_top = pos_form.top + 405;


                        $( ".modal-scroll" ).append('<div id="popup-shoutout-info" class="popups-left" style="display:none;">Enter your employee# so we know who the shoutout is from</div>');
                        $( ".modal-scroll" ).after('<div id="popup-shoutout-choose" class="popups-left" style="display:none;">Choose a response or write your own</div>');
                        $( ".modal-scroll" ).after('<div id="popup-shoutout-submit" class="popups-top" style="display:none;">Then click submit</div>');

                        //$('#popup-shoutout-info').css({top: info_top, left: info_left, position:'absolute'});
                        $('#popup-shoutout-info').css({top: info_top + 'px', left: '-362px', position:'absolute'});
                        $('#popup-shoutout-info').delay(0050).fadeIn('slow');
                        $('#popup-shoutout-info').delay(2300).fadeOut('slow');

                        $('#popup-shoutout-choose').css({top: choose_top + 'px', left: '-362px', position:'absolute'});
                        $('#popup-shoutout-choose').delay(2200).fadeIn('slow');
                        $('#popup-shoutout-choose').delay(2000).fadeOut('slow');


                        $('#popup-shoutout-submit').css({top: submit_top + 'px', left: '215px', position:'absolute'});
                        $('#popup-shoutout-submit').delay(4000).fadeIn('slow').queue(function(next){
                            $('#edit-submitted-employee-id-from').focus();
                            $('#popup-shoutout-submit').dequeue();
                            $('#popup-shoutout-submit').delay(2000).fadeOut('slow');
                            pooped = false;
                        });
                    }


                });

            }



            //$( "#modalContent" ).after('<div id="test">test complete</div>');
            //popups //when someone clicks a user, this popups

            $('.popups-close').click(function() {
                $('#popup-shoutout-info').remove();
                $('#popup-shoutout-choose').remove();
                $('#popup-shoutout-submit').remove();
                //window.location.reload();

            });

        }
    }
}(jQuery));


