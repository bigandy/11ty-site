---
title: How I use get_iplayer to download the latest Gilles Peterson show!
date: 2021-03-28
draft: false
description:
tags: ['how-to']
---

## How to use get_iplayer

[get_iplayer](https://github.com/get-iplayer/get_iplayer) is a tool for downloading TV and Radio shows from the BBC iPlayer. I want to use it to get the latest Gilles Peterson show, and download it onto a folder on my machine.

### Run a search for Gilles Peterson's shows:

-   `get_iplayer --type=radio "Gilles Peterson"`
-   This returns a list of the 5 latest shows with their corresponding IDs e.g. `36727: Gilles Peterson - Words & Music From Pino Palladino, BBC Radio 6 Music, m000t5dn` where `m000t5dn` is the ID.

<img src="/assets/images/get_iplayer-search-for-gilles-peterson.png" loading="lazy" height="128" width="720" />

### How to download this show

-   `get_iplayer --pid=m000t5dn --radiomode=best` 320k quality -- this would be a massive 458MB so not going with this.
-   `get_iplayer --pid=m000t5dn --radiomode=good` is a lower quality 96k - much more reasonable at 130.31MB

### Download latest version of get_iplayer

-   [Full instructions for Macos are here](https://github.com/get-iplayer/get_iplayer/wiki/osx)
-   Navigate to https://github.com/get-iplayer/get_iplayer_macos/releases and grab the latest MacOS version
-   Download and then ctrl+click the installer as the installer is not signed.
-   Update the cache by running `get_iplayer --refresh --type=tv,radio` or `get_iplayer --refresh --type=radio` if only want radio.
