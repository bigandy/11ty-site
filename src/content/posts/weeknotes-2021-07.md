---
title: Raspberry Pi from MacOS via SD Card
subTitle: 'Weeknotes 2021 #7'
date: 2021-02-14
draft: true
description: -
tags: ['weeknotes']
---

-   get the image: https://www.raspberrypi.org/software/operating-systems/
-   install the image: https://www.raspberrypi.org/documentation/installation/installing-images/mac.md
-   `diskutil list` to find out the rdisk that your SD is associated with
-   `diskutil unmountDisk /dev/diskN` replacing the rdiskN with the number of the disk your SD card is associated with
-   `sudo dd bs=1m if=path_of_your_image.img of=/dev/rdiskN; sync` replacing the rdiskN with the number of the disk your SD card is associated with. In my case this is `sudo dd bs=1m if=/Users/andrew/Downloads/2020-08-20-raspios-buster-armhf-lite.img of=/dev/rdisk3; sync` (you can see the progress by pressing ctrl+t)
-   this will put the image on /Volumes/boot which will be accessible from the command line
-   `sudo diskutil eject /dev/rdiskN` to eject the SD card.

## Set up Wifi on the card

-   https://www.raspberrypi.org/documentation/configuration/wireless/headless.md
-   cd /Volumes/boot
-   vim wpa_suplicant.conf
-   enter wifi and country code in the file but that note that this will need to be the 2.4GHz network if you have a Raspberry Pi that does not support 5GHz.

    ```
    ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
    update_config=1
    country=<Insert 2 letter ISO 3166-1 country code here>

    network={
    ssid="<Name of your wireless LAN>"
    psk="<Password for your wireless LAN>"
    }
    ```

-   enable ssh https://www.raspberrypi.org/documentation/remote-access/ssh/README.md easiest is to place a `ssh` file in the sd card during setup
-   eject the SD card and put in the raspberry pi and turn it on

## Format the SD Card

-   `sudo diskutil eraseDisk FAT32 RASPBIAN MBRFormat /dev/diskN` replacing diskN with your disk number found by running `diskutil list`. Note that this gives the name RASBIAN to the SD Card so now you can cd into /Volumes/RASPBIAN. I followed this site: https://www.michaelcrump.net/the-magical-command-to-get-sdcard-formatted-for-fat32/

## Install Nodejs on the raspberry pi

-   Need to SSH into the PI first then you can do the command line work.
-   Follow this as it worked for me: https://www.instructables.com/Install-Nodejs-and-Npm-on-Raspberry-Pi/

## Install Apache

-   https://www.raspberrypi.org/documentation/remote-access/web-server/apache.md
-   Should be able to navigate to `http://raspberrypi.lan/`
-   Files should be kept in `/var/www/html/` directory
-   Folder and file permissions for the var/www folder : https://www.raspberrypi.org/forums/viewtopic.php?t=155067

## Johnny Five Button on Pi

-   npm install johnny-five raspi-io
-   create index.js
-   =======
