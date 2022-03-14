---
title: 'Angular with WP API'
date: 2015-08-18 15:23:48
draft: false
description: 'Here is how you can use the WP API to pull in the 10 latest posts using Angular.'
tags: ['developing']
author: 'Andrew'
---

I wanted to be able to use the WP API to show my latest posts on an external site, and here's how I did it using Angular. You need:

-   A WordPress site with the latest version of the [WP API Plugin](https://github.com/WP-API/WP-API) (I am using 2.0 Beta 4.0) from Github (use develop branch)
-   A copy of [Angular](https://angularjs.org/)

html:

    	Latest 10 Posts from big-andy.co.uk

js:

    var app = angular.module('app', []);

    // filter to convert html to trusted html.
    app.filter('to_trusted', ['$sce', function($sce){
    	return function(text) {
    		return $sce.trustAsHtml(text);
    	};
    }]);

    // Add a controller
    app.controller( 'AppCtrl', ['$scope', '$http', function( $scope, $http ) {
    	// Load posts from the WordPress API
    	$http({
    		cache: true,
    		method: 'GET',
    		url: 'https://big-andy.co.uk/wp-json/wp/v2/posts',
    		params: {
    			'filter[posts_per_page]' : 10
    		},
    	}).
    	success( function( data, status, headers, config ) {
    		$scope.posts = data;
    	});
    }]);

[See Demo](http://bigandy.pw/angular/) or [See Codepen Demo](http://codepen.io/bigandy/pen/aOxPLM/) \[lazy\]

See the Pen [Angular WP API](http://codepen.io/bigandy/pen/aOxPLM/) by Andrew Hudson ([@bigandy](http://codepen.io/bigandy)) on [CodePen](http://codepen.io).

\[/lazy\]
