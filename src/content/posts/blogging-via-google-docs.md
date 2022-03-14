---
title: 'Blogging via Google Docs'
date: 2011-06-22 20:10:55
draft: false
description: ''
tags: ['google docs', 'publishing', 'technology', 'wordpress', 'xmlrpc']
author: 'Andrew'
---

Earlier this week I stumbled upon a video explaining [how to run a news site and newspaper using Wordpress and Google Docs](http://www.mediabistro.com/10000words/how-to-run-a-news-site-and-newspaper-using-wordpress-and-google-docs_b4781) and I thought that I would take their advice and try it out. So this post is written in Google Docs and will be transferred, once I have finished writing it, using a plugin called [Docs to WordPress](http://wordpress.org/extend/plugins/docs-to-wordpress/installation/) and the WordPress xml-rpc. In google docs set up two unique folders (or collections) called, for example, â€œTo Publishâ€ and â€œPublishedâ€. Grab the unique the last characters from each of the folderâ€™s URL, along with your username and password as [outlined in this article](http://dev.bangordailynews.com/2011/06/20/quick-update-to-the-docs-to-wordpress-plugin/) and put them into the wp-config.php file in the root of your site. I think that this is great when you want to have time to compose a post without the distraction of the rest of your blog, or the internet, with the ability to work collaboratively with others working on the same document as you. For example the writer and the editor can work together on the document and when finished tag the document â€œto publishâ€ and then it gets sent to wordpress to be published. You cannot publish directly because you need to go into the wordpress build and click publish which I think is good because it stops you if you Â send something accidentally.
