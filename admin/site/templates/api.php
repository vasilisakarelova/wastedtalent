<?php
header('Content-type: application/json; charset=utf-8');

$data = $page;
$json = array();

// about Details
$about = $site->find('about');
$logo = $about->logo();
$json['about'][] = array(
  'url'   => (string)$about->slug(),
  'title' => (string)$about->title(),
  'logo' => $about->files()->find($logo)->url(),
  'abouttext'  => (string)$about->abouttext()->kirbytext(),
  'impressumtext'  => (string)$about->impressumtext()->kirbytext(),
);

// management Details
$management = $site->find('management');
$artists = $pages->find('management')->children()->visible();
$artistarray = array();
foreach($artists as $artist) {
  $introimage = $artist->intro_image();
  $introimagesrc = $artist->files()->find($introimage)->url();
  $artistgallery = array();

  foreach($artist->main_gallery()->yaml() as $image) {
    $artistgallery[] = array(
      'src' => $artist->files()->find($image)->url()
    );
  }

  $artistarray[] = array(
    'url'   => (string)$artist->slug(),
    'title' => (string)$artist->title(),
    'intro_text'  => (string)$artist->intro_text(),
    'intro_image'  => $introimagesrc,
    'main_text'  => (string)$artist->main_text(),
    'main_gallery'  => $artistgallery
  );
}

$json['management'][] = array(
  'url'   => (string)$management->slug(),
  'title' => (string)$management->title(),
  'headline'  => (string)$management->headline(),
  'artists' => $artistarray
);

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
