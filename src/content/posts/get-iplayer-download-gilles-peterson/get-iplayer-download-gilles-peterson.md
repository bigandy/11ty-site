---
title: How I use get_iplayer to download the latest Gilles Peterson show!
date: 2021-03-28
draft: false
description:
tags: ['how-to']
author: 'andrew'
---

## How to use get_iplayer

[get_iplayer](https://github.com/get-iplayer/get_iplayer) is a tool for downloading TV and Radio shows from the BBC iPlayer. I want to use it to get the latest Gilles Peterson show, and download it onto a folder on my machine.

### Run a search for Gilles Peterson's shows:

-   <pre><code>get_iplayer --type=radio "Gilles Peterson"</code></pre>
-   This returns a list of the 5 latest shows with their corresponding IDs e.g. <strong>Gilles Peterson - Words & Music From Pino Palladino, BBC Radio 6 Music, m000t5dn</strong> where <strong>m000t5dn</strong> is the ID.

### How to download this show

-   <pre><code>get_iplayer --pid=m000t5dn --radiomode=best</code></pre> 320k quality -- this would be a massive 458MB so not going with this.
-   <pre><code>get_iplayer --pid=m000t5dn --radiomode=good</code></pre> is a lower quality 96k - much more reasonable at 130.31MB

<div class="notes">

### How to: Download the latest version of get_iplayer

-   [Full instructions for Macos are here](https://github.com/get-iplayer/get_iplayer/wiki/osx)
-   Navigate to https://github.com/get-iplayer/get_iplayer_macos/releases and grab the latest MacOS version
-   Download and then ctrl+click the installer as the installer is not signed.
-   Update the cache by running <pre><code>get_iplayer --refresh --type=tv,radio</code></pre> or <pre><code>get_iplayer --refresh --type=radio</code></pre> if only want radio.

</div>
