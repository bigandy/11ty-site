---
title: 'How to trigger a webhook with WordPress'
date: 2018-10-12 12:38:35
draft: false
description: ''
tags: ['life']
author: 'Andrew'
---

I have a Gatsby site [andrewhudson.me](http://andrewhudson.me) which is a static Server Side Rendered (SSR) site built using React and hosted on Netlify. I wanted to trigger a build when I published a new post (or updated an existing one) in WordPress and here's how I did it.

1.  Get webhook url from Netlify
2.  In WordPress code:

```
    function ah_webhook_netlify_post() {
    	$url = 'https://api.netlify.com/build_hooks/XXXXXXXXXXX';

    	$args =	array(
    		'method' => 'POST',
    		'timeout' => 5,
    		'blocking' => false,
            );
    	wp_remote_post( $url, $args );
    }
    add_action( 'publish_post', 'ah_webhook_netlify_post' );
```
