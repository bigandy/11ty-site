---
title: 'Plugin Development (part one) [wordpress]'
date: 2011-03-30 17:58:46
draft: false
description: ''
tags: ['life']
author: 'Andrew'
---

This is the first time that I have started to make a plugin and here I shall write about the process of making it. To begin with I will explain why you might want to make a plugin, then I will go into the process behind creating one.

### Why plugin?

A plugin is a way to extend the powers of wordpress in a particular direction without having the hastle of going into the back-end and getting your hands dirty.

### The process

To start with you have to have an idea of what you want to do. In my case I have an external application that requires a key that is specific to the owner of the blog. They enter the code in the admin area of the plugin, it stores the code in the site's database and calls this code when required.

### Puzzle pieces

For the plugin to be able to work you need a few different components (pieces):

1.  Admin areaâ€”place to enter the "key" (code);
2.  Way to store write code to database;
3.  Way to access code from DB;
4.  Way to write code to required place in wordpress (e.g. in the footer.php or loop.php);

In the next post I will outline how I have done this.
