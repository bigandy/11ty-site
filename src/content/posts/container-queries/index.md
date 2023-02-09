---
title: Container Queries
subTitle: 'An introduction to Container Queries'
date: 2023-01-31
publishDate: 'January 31 2023'
draft: true
description: ""
tags:
- 'css'
- 'container-queries'
---

Up there with :has(), container queries are one of my most desired CSS features of many years. I am very excited for this new CSS feature and I want to go in detail how I am excited for them and how to use them.

## What are Container Queries?

Imagine a world where you have a calendar component and you want to change the UI of it depending on the situation of that component but you don't know where it might be on the app or site, you don't know if it will be in a wide section or a narrow sidebar. With container queries you are able to apply CSS based purely on the constraints of the location that the component is in.

```css
@media (min-width: 600px) {
	.title {
		font-size: 3em;
	}
}
```

This would style the `.title` class when the viewport is wider than 600px. Otherwise the style will fall back to what is outside of that query.

## What is the browser support for Container Queries?
Browser support for Container Queries (so far this means inline-size based queries) is good in all of the main browsers with the exception of Firefox. The next stable Firefox release (due on Valentines Day - 14 February - 2023) will have support for container queries.

## What is the future of Container Queries?

## How to use Container Queries?

## Container Query Polyfill
There is one main [container query polyfill](https://www.npmjs.com/package/container-query-polyfill)
