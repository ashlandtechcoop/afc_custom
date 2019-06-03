<?php

/**
 * Views area handler to display some result summary.
 *
 * @ingroup views_area_handlers
 */
class afc_survey_results_header extends views_handler_area {

  /**
   * {@inheritdoc}
   */
  public function option_definition() {
    $options = parent::option_definition();
  }

  /**
   * {@inheritdoc}
   */
  public function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
  }

  /**
   * Find out the information to render.
   */
  public function render($empty = FALSE) {
    if ($empty || !isset($this->view->args[0])) {
      return 'No Result Summary to Display';
    }
    if (empty($this->view->args[0])) {
      return 'No Result Summary to Display';
    }
    $results = _getSurveyResults($this->view->args[0]);

    $variables = [
      'count' => $results['total_count'],
      'aggregate_results' => $results['aggregate_results'],
      'survey_title' => $results['survey_title'],
      'closes' => $results['closes']
    ];

    return theme('survey_results',$variables);
  }

}
