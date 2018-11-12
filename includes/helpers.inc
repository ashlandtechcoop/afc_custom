<?php

/**
 * Custom function to lookup uid for badge number
 */
function afc_custom_return_uid_for_badge($badge) {
    dpm('badge');

    if ($badge) {
        $query = db_query("SELECT p.uid FROM {field_data_field_badge} b join {profile} p on entity_id = pid where b.field_badge_value =".$badge);
        $records = $query->fetchAll();
        if ($records[0]->uid) {
            //if its there, return the first one
            return $records[0]->uid;
        }
    }
}
