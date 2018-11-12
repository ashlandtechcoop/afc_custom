<?php

/**
 * Custom function to count shoutouts
 *  and change number when new shoutout is given
 */
function afc_custom_calculate_shoutout(&$nodeinfo)

}


/**
 * Custom function that creates shoutout node from
 *  submitted response on shoutout webform
 */
function afc_custom_add_new_shoutout(&$nodeinfo){
    global $user; //should be service account

    $title = 'shoutout to ' . $nodeinfo['employee_to'] . date('m-d-y');
    $new_message = null;
    $new_message = new stdClass();
    $new_message->title = $title;
    $new_message->body[LANGUAGE_NONE][0]['value'] = $nodeinfo['body'];
    $new_message->type = 'shoutout';
    $new_message->language = LANGUAGE_NONE;
    node_object_prepare($new_message);
    $new_message->uid = $user->uid;
    $new_message->status = 1;
    $new_message->promote = 0;
    $new_message->comment = 0;
    $new_message->field_employee[LANGUAGE_NONE][0]['uid'] = $nodeinfo['employee_to'];
    $new_message->field_employee_from[LANGUAGE_NONE][0]['uid'] = $nodeinfo['employee_from'];

    $new_message = node_submit($new_message);
    node_save($new_message);

    watchdog('afc_custom', 'Created new shoutout to user @user', array('@user' => $nodeinfo['employee_to']));
}