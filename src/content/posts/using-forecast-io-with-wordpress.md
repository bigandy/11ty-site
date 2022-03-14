---
title: 'Using forecast.io with WordPress'
date: 2015-10-22 15:36:53
draft: false
description: "How to use the WordPress Transients API and wp\_remote\_get() to grab the latest weather from the forecast.io API."
tags: ['developing']
author: 'Andrew'
---

For ages this sites has had the tagline "I'm a front-end and WordPress developer based in **sunny** Oxfordshire. hello!" and I wanted to be able to update the **sunny** with the days weather. How British I know! I am using [wp_remote_get()](https://codex.wordpress.org/Function_Reference/wp_remote_get) to grab a [JSON object from the forecast.io API](https://developer.forecast.io/docs/v2), then selecting the part that I want - the current weather - and storing this in my database using [WordPress Transients API](https://codex.wordpress.org/Transients_API) to cache the result for 3 hours so that I don't make multiple API calls (and so I don't go over the 1000 API calls per day). I have wrapped the code in a shortcode so that I can call it wherever I like.

    function ah_shortcode_weather( $atts, $content ) {
    	$response_args = [
    		'timeout' => 120,
    	];

    	$transient_name = 'weather'; // Name of value in database.
    	$cache_time = 3; // Time in hours between updates.

    	// If the transient is not set
    	if ( false === ( $weather = get_transient( $transient_name ) ) ) {
    	   // Get new $response from the weather api
    	   $response = wp_remote_get( 'https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE?units=uk', $response_args );
    	   // Check if response is an array
    	   if ( is_array( $response ) ) {
    			// Get response body
    			$response_body = json_decode( $response['body'] );
    			// Get Current Weather Summary
    			$weather = strtolower( $response_body->currently->summary );
    			// Set the transient
    			set_transient( $transient_name, $weather, 60 * 60 * $cache_time );
    		}
    	}

    	$html = $weather;

    	return esc_html( $html );
    }

    add_shortcode( 'weather', 'ah_shortcode_weather' );

To use this I call it with the shortcode "weather". **EDIT:** after a week of using this the weather is almost always "partly cloudy". Welcome to autumn/winter! **EDIT (19.08.2016) :**Having used this shortcode in the tagline of my site its not very positive displaying the horrible British weather so have removed it from the tagline. You can still find it here: The Weather is currently : \[weather\]
