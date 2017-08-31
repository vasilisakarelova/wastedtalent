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
  if($artist->intro_image()->isNotEmpty()):
    $introimage = $artist->intro_image();
    $introimagesrc = $artist->files()->find($introimage)->url();
    $introimagethumb = $artist->files()->find($introimage)->thumb(['width' => 300])->url();
  else:
    $introimagesrc = null;
    $introimagethumb = null;
  endif;

  $artistgallery = array();

  foreach($artist->main_gallery()->yaml() as $image) {
    $artistgallery[] = array(
      'src' => $artist->files()->find($image)->url(),
      'thumb' => $artist->files()->find($image)->thumb(['width' => 300])->url()
    );
  }

  if($artist->artist_logo()->isNotEmpty()):
    $artistlogo = $artist->artist_logo();
    $artistlogosrc = $artist->files()->find($artistlogo)->url();
  else:
    $artistlogosrc = null;
  endif;

  if($artist->twitter_link()->isNotEmpty()):
	  $twitter_link = $artist->twitter_link()->url();
	else:
	  $twitter_link = null;
	endif;

	if($artist->facebook_link()->isNotEmpty()):
	  $facebook_link = $artist->facebook_link()->url();
	else:
	  $facebook_link = null;
	endif;

	if($artist->instagram_link()->isNotEmpty()):
	  $instagram_link = $artist->instagram_link()->url();
	else:
	  $instagram_link = null;
	endif;

  if($artist->instagram_img_1()->isNotEmpty()):
	  $instagram_img_1 = $artist->instagram_img_1()->url();
	else:
	  $instagram_img_1 = null;
	endif;

  if($artist->instagram_img_2()->isNotEmpty()):
	  $instagram_img_2 = $artist->instagram_img_2()->url();
	else:
	  $instagram_img_2 = null;
	endif;

  if($artist->instagram_img_3()->isNotEmpty()):
	  $instagram_img_3 = $artist->instagram_img_3()->url();
	else:
	  $instagram_img_3 = null;
	endif;

  if($artist->booking_info()->isNotEmpty()):
	  $booking_info = (string)$artist->booking_info();
	else:
	  $booking_info = null;
	endif;

  $artistarray[] = array(
    'url'   => (string)$artist->slug(),
    'title' => (string)$artist->title(),
    'intro_text'  => (string)$artist->intro_text()->kirbytext(),
    'intro_image'  => $introimagesrc,
    'intro_image_thumb' => $introimagethumb,
    'artist_logo'  => $artistlogosrc,
    'main_text'  => (string)$artist->main_text()->kirbytext(),
    'main_gallery'  => $artistgallery,
    'twitter_link' => $twitter_link,
    'facebook_link' => $facebook_link,
    'instagram_link' => $instagram_link,
    'instagram_img_1' => $instagram_img_1,
    'instagram_img_2' => $instagram_img_2,
    'instagram_img_3' => $instagram_img_3,
    'booking_info' => $booking_info
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
