---
title: 'Plugin Error Fixed!!!'
date: 2011-03-31 22:11:45
draft: false
description: ''
tags: ['wordpress']
author: 'Andrew'
---

I have found out what I was doing wrong to cause my wordpress [plugin to throw up an error](http://blog.big-andy.co.uk/wordpress/plugin-error/ 'Plugin Error') and it was this: On activation you put a piece of code that says

> `register_activation_hook(__FILE__,'install_function');`

which basically means when the plugin is activated run the install_function. Problem turned out that I the function but hadn't named it correctly so the register_activation_hook wasn't looking for the right thing. I love it when I can work out how to solve things, and in the process learn a bit more about how to write a good plugin. Happy Days!
