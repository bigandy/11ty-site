---
title: 'Website Optimisation'
date: 2011-05-20 18:05:23
draft: false
description: ''
tags: ['wordpress']
author: 'Andrew'
---

I love speed, everything to do to get something done faster is must for me. This week I finally have fiber-optic internet and now I am looking to extend my passion for speed through in relation to THIS website. Why am I going to do this? I hate waiting for a website to load, you hate it too, right? There's far too much you'd prefer to be doing than waiting for a download to happen or a web page to open. How am I going to do this?

1.  Compression of files (CSS and javascript),
2.  use of heavy browser caching (via the .htaccess file),
3.  use of database caching (this is done by a wordpress plugin called W3 Total Cache)
4.  use of a Content Delivery Network (CDN)

## 1\. Compression

The larger the file the longer it takes to download resulting in a much slower page load time compared to when the files are compressed. Personally I use the [WP CSS](http://wordpress.org/extend/plugins/wp-css/) plugin although now I have installed the [W3 Total Cache](http://wordpress.org/extend/plugins/w3-total-cache/) (W3TC) plugin I might remove it and trust W3TC to do it all. When developing a site normally one might split the styles into a number of different style sheets (e.g. content.css, layout.css, reset.css, fonts.css) but this is a bad move. Each file requires request puts more strain on the internet connection and thus has a big impact on page speed. I combine all my css into one stylesheet (including the print css too) as recommended in the [HTML5 Boilerplate](http://html5boilerplate.com/ 'HTML5 Boilerplate - the bees knees for web dev project jumpoff') .

## 2\. Caching

Browser caching is the process that web browsers use to keep the files associated with a web page (css, javascript, images, and so on) on file so that they don't need to be downloaded again if the user visits another page in the site, or even comes back after visiting another site. As a website administrator you can change the amount of time that the browser will keep the files, so that the browser keeps files for a long time and don't need to continually download them. On Apache servers this can be controlled using by changing settings in the .htaccess file in the root folder of your site. There is excellent documentation on best practice on the HTML5 boilerplate website.

## 3\. Database Caching

Using a database driven website is great if you are writing a blog or another data-heavy website, but when a lot of users start to visit your site the amount of work that the server has to do each time a user visits adds up and will become a bottleneck on high-traffic sites. If, however, you cache the pages using a plugin and store the pages as static files then the server doesn't need to do anything once a user visits, just display the content (like any non database driven site). I am using w3TC to do this.

## 4\. Content Delivery Network

The world is a big place and even with today's fast internet connections the users - if for example your web server is situated in London - from USA are going to have a different page load time compared to those in London. If, however, you have access to a CDN your images, css, javascript (and so on) are hosted on a number of different servers all around the world, so your user in USA will have a much faster page load speed. I am trying out [Max CDN](http://www.maxcdn.com/) (after hearing of them and doing an offer through [AppSumo](http://appsumo.com)). I'll let you know how it goes... I have just setup my package so will see how it goes over the next week or so!
