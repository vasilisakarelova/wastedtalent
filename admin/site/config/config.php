<?php

## Licence
c::set('license', 'put your license key here');

## Redirect to admin
c::set('home', 'redirect');

## Search Query
c::set('routes', array(
  array(
    'pattern' => 'api/search/(:all)',
    'action' => function ($uri) {
      $query   = $uri;
      $results = site()->search($query)->toJson();

      return response::json(array(
        $results,
      ));
    }
  )
));

/*
JSON API Configuration
*/
c::set('jsonapi.built-in.enabled', true);
// this is for demonstration purposes ONLY - in any kind of "real world" application
// this should be set to _some_ form of authentication as described in the documentation
c::set('jsonapi.built-in.auth', function () {
	return Lar\JsonApi\JsonApiAuth::isLoggedIn();
});
