---
title: 'Weekend and PHP time'
date: 2010-05-07 22:16:08
draft: false
description: ''
tags: ['CIW', 'php', 'web-design']
author: 'Andrew'
---

Good Evening Folks! I have been working on some PHP recently. I have decided to change from .html to .php on [big-andy.co.uk](http://www.big-andy.co.uk/ 'big andy website') so that I could use a consistant navigation bar and any changes that I made would be only to one (navigation.php) file rather than 10+ files (with .html). I did have some difficulty, however, with my current testing situation. I am using XAMPP on my PC to test what I make before I publish it online. The root of my XAMPP site is http://localhost/ and the root of my website is http://big-andy.co.uk so I wanted to do some PHP to show the root and based on this to serve a different navigation (xampp-navigation.php or navigation.php) depending whether the page was on the XAMPP server or on the web-server. I did it like this:

<?php
if ($\_SERVER\["SERVER\_NAME"\] == "localhost"){ include'../php/xampp-navigation.php';} else {include'../php/navigation.php';}
?>

Thus the problem is now overcome and I can go back to my real life as a normal person. In other news the conservative scum have gained more seats than any other party in the UK General Election much to my distaste. They didn't gain enough seats to have a majority and we are now in a hung-parliament (no one party has a majority) for the first time since 1974. Will they do a deal with the lib-dems, or will the lib-dems do a deal with Labour scum? It's my Mum's Birthday today so "Happy Birthday Mum!" we're going over to Sandhurst tomorrow to have dinner at a restaurant with [my brother](http://www.rob-hudson.com/ 'rob-hudson.com'), [my girlfriend](http://www.marionmouttou.co.uk 'marionmouttou.co.uk') (both of whom need urgently to update their websites by the way) my Dad and Mum.
