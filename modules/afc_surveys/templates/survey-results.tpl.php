<div class="survey-results">

  <h3 class="survey-header">Here's what people are saying</h3>
  <h4 class="survey-question"><?php print $survey_title; ?> </h4>

  <figure>
  <?php $total_height = count($aggregate_results) * 60; ?>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="chart" width="420" height="<?php print $total_height; ?>" aria-labelledby="title" role="img">
    <title id="title"><?php print $survey_title; ?></title>

    <?php $y = 10; ?>
    <?php foreach($aggregate_results as $result): ?>
      <g class="bar">
        <rect width="<?php print $result->survey_choice_id_count * 5; ?>" height="30" y="<?php print $y; ?>" rx="15"></rect>
        <text x="<?php print $result->survey_choice_id_count * 5 + 10; ?>" y="<?php print $y + 15; ?>" dy=".35em">  <?php print $result->survey_choice_id_count .' '. $result->field_options_value; ?></text>
      </g>
      <?php $y = $y + 60; ?>
    <?php endforeach; ?>
  </svg>
  <figcaption>
    <?php print $count; ?> Total Votes
  </br>
  </br>
  Survey closes on <?php print $closes; ?>
  </figcaption>
</figure>
</div>
