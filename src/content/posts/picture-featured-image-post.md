---
title: 'Picture Featured Image Post'
date: 2014-06-11 10:34:54
draft: false
description: "The new <picture> element is incredible if you want to serve different images based on the width of the browser that the user is viewing your site on. While the browsers are currently working on implementing the spec, you can implement it with a polyfill called picturefill.js. I've applied this to my WordPress site and will detail how I've done it, starting first with featured images."
tags: ['picture']
author: 'Andrew'
---

The new <picture> element is incredible if you want to serve different images based on the width of the browser that the user is viewing your site on. The syntax is

```
<picture>
<source media="(min-width: 1400px)" srcset="largest-image.jpg" />
<source media="(min-width: 1000px)" srcset="large.jpg" />
<source media="(min-width: 750px)" srcset="medium.jpg" />
<source media="(min-width: 500px)" srcset="small.jpg" />
<img src="fallback-image.jpg" />
</picture>
```

The media attribute tells the browser at which width (or more specific which minimum width) the image should be shown. The srcset attribute gives the location of the file as src does in usual <img> element tags.
