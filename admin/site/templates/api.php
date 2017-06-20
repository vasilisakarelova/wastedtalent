<?php
// if(!r::ajax()) go(url('error'));
header('Content-type: application/json; charset=utf-8');

$data = $page;
$json = array();

// Site Details
/*$json['site'][] = array(
  'url'   => (string)$site->slug(),
  'title' => (string)$site->title(),
  'text'  => (string)$site->text(),
  'date'  => (string)$site->date(),
);*/

// Site Navigation
/*$navigation = $site->children()->visible();
foreach($navigation as $page) {
  $json['navigation'][] = array(
    'url'   => (string)$page->slug(),
    'title' => (string)$page->title(),
    'text'  => (string)$page->text(),
    'date'  => (string)$page->date(),
  );
}*/

// Home Details
$home = $site->find('home');
$json['home'][] = array(
  'url'   => (string)$home->slug(),
  'title' => (string)$home->title(),
  'text'  => (string)$home->text(),
  'date'  => (string)$home->date(),
);

// about Details
$about = $site->find('about');
$json['about'][] = array(
  'url'   => (string)$about->slug(),
  'title' => (string)$about->title(),
  'abouttext'  => (string)$about->abouttext()->kirbytext(),
  'impressumtext'  => (string)$about->impressumtext()->kirbytext(),
);

// management Details
$management = $site->find('management');
$json['management'][] = array(
  'url'   => (string)$management->slug(),
  'title' => (string)$management->title(),
  'headline'  => (string)$management->headline(),
);

// artists Details
$artists = $pages->find('management')->children()->visible();
foreach($artists as $artist) {
  $json['artists'][] = array(
    'url'   => (string)$artist->slug(),
    'title' => (string)$artist->title(),
    'intro_text'  => (string)$artist->intro_text(),
    'intro_image'  => (string)$artist->intro_image(),
    'main_text'  => (string)$artist->main_text(),
    'main_gallery'  => (string)$artist->main_gallery(),
  );
}

// publishing Details
$publishing = $site->find('publishing');
$json['publishing'][] = array(
  'url'   => (string)$publishing->slug(),
  'title' => (string)$publishing->title(),
  'headline'  => (string)$publishing->headline(),
  'p_content'  => (string)$publishing->p_content()->kirbytext(),
);

// digital Details
$digital = $site->find('digital');
$json['digital'][] = array(
  'url'   => (string)$digital->slug(),
  'title' => (string)$digital->title(),
  'headline'  => (string)$digital->headline(),
  'd_content'  => (string)$digital->d_content()->kirbytext(),
);

echo json_encode($json); ?>
