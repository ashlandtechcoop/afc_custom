<?php
/**
 * Implements hook_views_data_alter().
 */
function afc_surveys_views_data_alter(&$data) {
  $data['node']['field_survey_choice_selected'] = array(
    'title' => t('Survey Choice Selected'),
    'help' => t('Pulls the correct survey choice text'),
    'field' => array(
      'handler' => 'afc_surveys_handler_field_survey_choice_selected',
	  'click sortable' => TRUE,
    ),
  );
  $data['views']['survey_result'] = array(
    'title' => t('Survey Result summary'),
    'help' => t('Shows survey result as summary.'),
    'area' => array(
      'handler' => 'afc_survey_results_header',
    ),
  );
}
