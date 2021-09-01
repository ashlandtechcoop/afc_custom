(function ($) {
    Drupal.behaviors.blockRefresh = {
        attach: function (context, settings) {
            //shout stats search icon button refresh the view if it's hidden
            $('#shout-search-icon img').once().click(function() {
                if ($('div.view-shoutout-comment-list div.view-filters').is(":hidden")) {
                } else {
                    $.each(Drupal.views.instances, function (i, view) {
                        var selector = '.view-dom-id-' + view.settings.view_dom_id;
                        if (view.settings.view_display_id == "block") {
                            $(selector).triggerHandler('RefreshView');
                        }
                        $(selector).unbind();
                    });
                }

            });
            //also refresh it when someone hits refresh icon
            $('.refresh-icon').once().click(function() {
                $.each(Drupal.views.instances, function (i, view) {
                    var selector = '.view-dom-id-' + view.settings.view_dom_id;
                    if (view.settings.view_display_id == "block") {
                        $(selector).triggerHandler('RefreshView');
                    }
                    $(selector).unbind();
                    $('div.view-shoutout-comment-list div.view-filters').fadeOut('slow');

                });
            });
        }
    }
}(jQuery));
