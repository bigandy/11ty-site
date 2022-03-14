---
title: 'Road to Page Speed Perfection'
date: 2014-08-21 19:00:21
draft: false
description: 'A tweet inspired me to improve my page speed score and I managed to get both mobile and desktop to 100.'
tags: ['dev']
author: 'Andrew'
---

This morning Smashing Magazine tweeted about their latest Page Speed Score: https://twitter.com/smashingmag/status/502334585511084033 And I wanted to know if it was possible if I could achieve that or better (preferably better!). Someone replied to the initial tweet saying that there was already a tutorial by Dave Rupert in [two](http://daverupert.com/2014/07/rwd-bloat/) [parts](http://daverupert.com/2014/07/rwd-bloat-part-ii/), I read the articles and applied what Dave learnt to my site. I have achieved 100 in both Mobile and Desktop and here's [my score](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fbig-andy.co.uk).

## Changes I made

As I am using nginx and spdy 3.1 my site was already fast. 91 on desktop and 75 on mobile. But this was far from perfect so I:

-   Deferred the loading of the web font. If you wait for the webfont to load before the html is loaded onto the page then that's a significant blocker. I used [javascript that defers font loading](https://gist.github.com/hdragomir/8f00ce2581795fd7b1b7).
-   Inlined the CSS using a [WordPress include](https://github.com/bigandy/big-andy.co.uk/blob/master/content/themes/v4/header.php#L9)

## Future improvements

While the numbers say that it's 100% I am still not fully happy with this solution. I need to do resolve two issues:

1.  I want to automate the production of the critical css (at the moment all the CSS is inlined, rather than the critical css) but I had issues with Foundation's grid and Dave's method of creating the critical css.
2.  find a better way of including the cloud.typography.com font
