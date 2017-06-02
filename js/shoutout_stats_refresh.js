(function ($) {
    Drupal.behaviors.blockRefresh = {
        attach: function (context, settings) {
            //shout stats search icon button refresh the view if it's hidden
            jQuery('#shout-search-icon img').once().click(function() {
                if (jQuery('div.view-shoutout-comment-list div.view-filters').is(":hidden")) {
                } else {
                    jQuery.each(Drupal.views.instances, function (i, view) {
                        var selector = '.view-dom-id-' + view.settings.view_dom_id;
                        if (view.settings.view_display_id == "block") {
                            jQuery(selector).triggerHandler('RefreshView');
                        }
                        jQuery(selector).unbind();
                    });
                }

            });
            //also refresh it when someone hits refresh icon
            jQuery('.refresh-icon').once().click(function() {
                jQuery.each(Drupal.views.instances, function (i, view) {
                    var selector = '.view-dom-id-' + view.settings.view_dom_id;
                    if (view.settings.view_display_id == "block") {
                        jQuery(selector).triggerHandler('RefreshView');
                    }
                    jQuery(selector).unbind();
                    $('div.view-shoutout-comment-list div.view-filters').fadeOut('slow');

                });
            });
        }
    }
}(jQuery));