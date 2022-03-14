---
title: 'How I run my site'
date: 2014-08-21 07:41:24
draft: false
description: 'Skills that I’ve learned in my day job have enabled working on the latest version of this site much more simple and pleasurable than previously. I use Gulp, Bower and Continuous deployment to streamline everything.'
tags: ['developing']
author: 'Andrew'
---

Skills that I've learned in my day job have enabled working on the latest version of this site much more simple and pleasurable than previously. I use Gulp, Bower and Continuous deployment to streamline everything.

## Gulp

I've been using Gulp for about 6 months (and Grunt for a similar time before that) and it is incredible in that I can automate most of the small tasks that make a site faster to develop and to load. For example, I've started to use **uncss** which removes extraneous CSS after comparing the html on a specified set of pages with the CSS file and removing any CSS that is not required. Awesome! I use **autoprefixer** to add in or remove vendor prefixes (depending on the latest specs). At the moment I can specify which browsers I want to support and I chose to have 'the latest 2 versions'. I use **gulp-sass** which combines and minifies the CSS from the .scss files. It is super-shit-hot fast compared to Grunt. Good use of **livereload** to monitor my code and refresh the browser when I've done something. No more cmd-r for me! I also remove console.log() and alert() from the JS, lint my WordPress php, and create SVG spritesheets.

## Bower

One simple line of code fetches jquery and adds it to your project

bower install jquery

. Before you had to go to the jquery site, manually download, then create a new file in your project and save the new file. Such effort is now reduced to a single line of command line.

## Continuous Deployment

I used to use Capistrano and that was incredible but required you to manually type a deployment instruction when you were ready to deploy, and a lot of setting up too. DeployHQ reduces all of that and it monitors Github (where I keep my code) for a signal to deploy the code. So if I push code to a specific branch it goes live straight away. Incredible!
