<?php

class afc_surveys_handler_field_survey_choice_selected extends views_handler_field {

  function option_definition() {
    $options = parent::option_definition();
    return $options;
  }


  function query() {

    $this->ensure_my_table();
    $sql = "SELECT field_options_value
            FROM afcportal.field_data_field_survey_option_select
            join field_data_field_survey_reference on field_data_field_survey_option_select.entity_id = field_data_field_survey_reference.entity_id
            join field_data_field_options on field_survey_reference_target_id = field_data_field_options.entity_id
            and field_survey_option_select_value = field_data_field_options.delta
            where field_data_field_survey_option_select.entity_id = node.nid";
    $this->field_alias = $this->query->add_field(NULL, "($sql)", 'field_survey_choice_selected');
  }

  function render($values) {
  	$output = '';
  	$value = $this->get_value($values);
  	return empty($value) ? '' : $value;
  }

}
