---
title: 'FF Conf 2016'
date: 2016-11-24 10:04:23
draft: false
description: 'I have wanted to attend FFConf for as many years as it has been running and this year I was lucky to attend. Here are my notes from the talks which stood out to me...'
tags: ['dev']
author: 'Andrew'
---

[FFConf](https://2016.ffconf.org/) is a front-end conference held in Brighton every year and here are my notes from the talks that stood out:

### Future CSS - Rachel Andrew [SLIDES](http://www.slideshare.net/rachelandrew/nextlevel-css?utm_content=buffer7cb6c)

Rachel covered a number of different future / current in some browsers CSS such as flexbox, grid, @supports, shapes and path-clipping, initial letter, css variables and calc, position: sticky and scroll snapping.

-   flexbox: already [good browser support](http://caniuse.com/#search=flexbox)
-   grid: coming to browsers in Spring 2017. Where flexbox is for one dimension, grid is for two dimensions. Can be used alongside flexbox not either or.
    -   [Grid By Example - Examples/Tutorials/Videos](http://gridbyexample.com)
    -   [How to enable](https://igalia.github.io/css-grid-layout/enable.html) in Canary/Firefox/Opera/Safari
-   @supports feature detection with CSS. e.g. [Supports will Change your Life](http://www.lottejackson.com/learning/supports-will-change-your-life)
-   [Shapes](http://webplatform.adobe.com/shapes/) + Path-clipping [cool clip-path tool](http://bennettfeely.com/clippy/)
-   position: sticky; Firefox, Safari, Canary. [Overview on CSS-tricks](https://css-tricks.com/position-sticky-2/)
-   [scroll snapping](https://css-tricks.com/introducing-css-scroll-snap-points/) Supported by Firefox, Edge/IE11/Safari (partial).

### Technologic (human after all): accessibility remix - Léonie Watson - [SLIDES](http://ljwatson.github.io/decks/2016/ffconf/index.html#)

Excellent accessibility talk with reference to screen readers, writing HTML with aria-roles.

-   Aria roles
-   Aria name e.g. aria-labelledby
-   Aria state e.g. aria-checked
-   Use inbuilt HTML semantics e.g. use button not div with aria-role="button"
-   Test without mouse, using screen reader

### Optimise Your Web Development Workflow - Umaar Hansa

100+ slides with many cool features that are in Chrome Dev Tools. Tools including:

-   analyse unused css
-   box- and text-shadow in dev tools
-   workspaces v2
-   terminal in browser (Mac Only)
-   ctrl-shift-p: allows you to enter commands like you do with sublime text.
-   [enable devtools experiments](chrome://flags/#enable-devtools-experiments) e.g. Allow Custom UI Themes
-   [enable experimental web platform features](chrome://flags/#enable-experimental-web-platform-features) e.g. grid

Open dev tools, press F1, Goto "experiments" tab, press shift 6 times. Check out his [dev tool tips](https://umaar.com/dev-tips/) for more!

## Other Write-ups

-   [https://medium.com/mr-tech-stories/reasons-why-ffconf-2016-was-a-successful-tech-conference-2cbacaae6864#.958g3izhe](https://medium.com/mr-tech-stories/reasons-why-ffconf-2016-was-a-successful-tech-conference-2cbacaae6864#.958g3izhe)
-   [http://espeo.eu/blog/ffconf-best-web-frontend-conference/](http://espeo.eu/blog/ffconf-best-web-frontend-conference/)
-   [https://medium.com/etch-stories/full-frontal-the-conference-experience-c1c11ff9370d#.m5zljiute](https://medium.com/etch-stories/full-frontal-the-conference-experience-c1c11ff9370d#.m5zljiute)
