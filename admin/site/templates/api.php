<?php
// if(!r::ajax()) go(url('error'));
header('Content-type: application/json; charset=utf-8');

$data = $page;
$json = array();

// Site Details
$json['site'][] = array(
  'url'   => (string)$site->slug(),
  'title' => (string)$site->title(),
  'text'  => (string)$site->text(),
  'date'  => (string)$site->date(),
);

// Site Navigation
$navigation = $site->children()->visible();
foreach($navigation as $page) {
  $json['navigation'][] = array(
    'url'   => (string)$page->slug(),
    'title' => (string)$page->title(),
    'text'  => (string)$page->text(),
    'date'  => (string)$page->date(),
  );
}

// Home Details
$home = $site->find('home');
$json['home'][] = array(
  'url'   => (string)$home->slug(),
  'title' => (string)$home->title(),
  'text'  => (string)$home->text(),
  'date'  => (string)$home->date(),
);

// management Details
$management = $site->find('management');
$json['management'][] = array(
  'url'   => (string)$management->slug(),
  'title' => (string)$management->title(),
  'text'  => (string)$management->text()->kirbytext(),
  'intro'  => (string)$management->intro()->kirbytext(),
  'date'  => (string)$management->date(),
);

// digital Details
$digital = $site->find('digital');
$json['digital'][] = array(
  'url'   => (string)$digital->slug(),
  'title' => (string)$digital->title(),
  'text'  => (string)$digital->text(),
  'date'  => (string)$digital->date(),
);

// publishing Details
$publishing = $site->find('publishing');
$json['publishing'][] = array(
  'url'   => (string)$publishing->slug(),
  'title' => (string)$publishing->title(),
  'text'  => (string)$publishing->text(),
  'date'  => (string)$publishing->date(),
);

echo json_encode($json); ?>
