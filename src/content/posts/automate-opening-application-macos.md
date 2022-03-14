---
title: 'Automate Opening Zoom MacOS'
date: 2018-08-15 07:55:32
draft: false
description: 'I detail how to automate the opening of Zoom on MacOS using crontab.'
tags: ['life']
author: 'Andrew'
---

At work we have daily standups using Zoom and my colleague Ryo asked if it was possible to automate the opening of the Zoom app in the correct meeting group at a specific time every day.

## Steps:

1.  open terminal
2.  crontab -e
3.  57 8 \* \* 1-5 ~/openZoom.sh

4.  'esc' and ':wq' to exit crontab
5.  create ~/openZoom.sh with the following :

    > #! /bin/bash -l
    >
    > open https://zoom.us/j/<meeting-id>

6.  chmod +x ~/openZoom.sh

## Crontab syntax

I have used 57 8 \* \* 1-5 ~/openZoom.sh and I will break that down command by command:

-   57 - minutes past the hour
-   8 - hours
-   \* - day (month i.e. it could be fourth day of the month)
-   \* - month (i.e. it could be 2 and thus February)
-   1-5 - day (of the week, I have used 1-5 so Mon-Fri)
-   ~/openZoom.sh - executes the ~/openZoom.sh file
