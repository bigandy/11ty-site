---
title: Trialling Eleventy.
description: I wanted to be able to write without having to fucking login to WordPress, I didn't want to use Jekyll or Gatsby. Thus I am using Eleventy.
date: 2019-03-12
author: 'Andrew'
---

I have been using WordPress to write for a long time but lately I have been wanting something different, seperating the place where you write from the internet and allowing one to focus on the writing not the process of putting the writing live in a web browser.

I have used Jeykll in the past but that process was much slower than I'd like. It felt like going into the stone age - Ruby, poor developer experience.

## Requirements of a new blogging platform

1. Uses markdown
2. Uses JS
3. Browser sync and local server easy to setup and use
4. Easy to get started with a blog with archive, tagging and ability to schedule posts
5. Deploy easily and quickly with Netlify on push of code to Github.

## What are the contenders?

I can see two main contenders: Eleventy and Gatsby. Out of the box Eleventy is simpler to set up and doesn't really require learning anything in terms of different tech stacks whereas Gatsby is React based and uses GraphQL as its API. I have made a simple Gatsby site in the past that pulls in data from WordPress, Strava and Contentful but for this case I want to be able to use markdown files to be able to write posts in the text editor (or IA Writer if I decide that place would be better in the future).

## I have an Eleventy Site on [andrewhudson.blog](https://andrewhudson.blog).

This site is built using the Eleventy Blog Starter and was incredibly easy to get going without having to learn much new other than being able to write a custom filter to not show future posts. It uses Nunjucks as the templating engine and is super quick, has Browser Sync for local development and blog post previewing.

## I have a Gatsby Site on [bigandy.netlify.com](https://bigandy.netlify.com).
