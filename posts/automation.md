---
title: 'Automation'
date: 2013-11-20 12:20:08
draft: false
description: ""
tags: ['developing']
---

Recently I have been going through the number of processes that I need to do to set up a new WordPress site locally before development can commence. Below I will outline these and then in a follow up post I will describe how I have gone about automating them. Steps to automate:

*   Create new folder
*   Add WordPress files
*   Add Starter Theme
*   Setup Database
*   Configure hosts with localhost url(/etc/hosts)
*   Configure httpd-vhosts.conf with localhost url and project folder location
*   Customise style.sass with theme name
*   Initialise git, add files to git, initial commit, add remote, first push
*   Restart Apache
*   Import default db with test data
*   Add Default wp-config.php, and configure with db name, localhost url
*   Run `grunt sass` to compile initial style.css file (in this case I'm ignoring \*.css files in git)
*   Add alias to ~/.bash\_profile (to do grunt)
*   Add default plugins you know, the ones that you use on every site.