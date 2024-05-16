import { DateTime } from 'luxon';
import fs from 'fs';
import Image from '@11ty/eleventy-img';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';

import pluginRss from '@11ty/eleventy-plugin-rss';

import { htmlDateString } from './src/_11ty/filters/htmlDateString.js';
import { readableDate } from './src/_11ty/filters/readableDate.js';
import { firstNElements } from './src/_11ty/filters/firstNElements.js';
import Book from './src/_includes/components/book.js';
import tagList from './src/_11ty/getTagList.js';
import transformCSS from './src/utils/transform-css.js';
import optimizeHTML from './src/_11ty/optimize-html.js';

import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

const showDrafts = process.env.ELEVENTY_DRAFTS === 'true';

import { minify } from 'terser';

/**
 *  @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
export default async function (eleventyConfig) {
	// Plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight);

	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(optimizeHTML);

	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.addShortcode('Book', Book);

	eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

	eleventyConfig.addNunjucksAsyncShortcode('postcss', transformCSS);

	eleventyConfig.addNunjucksAsyncFilter(
		'jsmin',
		async function (code, callback) {
			try {
				const minified = await minify(code);
				callback(null, minified.code);
			} catch (err) {
				console.error('Terser error: ', err);
				// Fail gracefully.
				callback(null, code);
			}
		}
	);

	// Present and past posts only
	// https://remysharp.com/2019/06/26/scheduled-and-draft-11ty-posts
	const now = new Date();
	const livePosts = (p) => p.date <= now;
	const removeDraftsFromTagsList = (drafts) => {
		if (showDrafts) {
			return drafts;
		}

		return drafts.filter((draft) => {
			if (!draft.data) {
				return;
			}

			if (draft.data.draft !== true) {
				return draft;
			}
		});
	};

	const removeWeeknotes = (post) => {
		if (post.data.tags) {
			return !post.data.tags.includes('weeknotes');
		}
		return post;
	};

	const showWeeknotes = (post) => {
		if (post.data.tags) {
			return post.data.tags.includes('weeknotes');
		}
		return post;
	};

	const removeDrafts = (post) => {
		if (showDrafts) {
			return post;
		}

		return post.data.draft !== true;
	};

	// Filters
	eleventyConfig.addFilter('readableDate', readableDate);
	eleventyConfig.addFilter('readablePostDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj, {
			zone: 'Europe/London',
		})
			.setLocale('en')
			.toLocaleString({ locale: 'en-gb' })
			.replaceAll('/', '-');
	});
	eleventyConfig.addFilter('encodeurl', (title) => {
		return encodeURI(title).replaceAll(' ', '');
	});

	eleventyConfig.addFilter('replaceSlashes', (str) => {
		return str.replaceAll('/', '');
	});

	eleventyConfig.addFilter('htmlDateString', htmlDateString);
	eleventyConfig.addFilter('firstNElements', firstNElements);
	eleventyConfig.addFilter(
		'removeDraftsFromTagsList',
		removeDraftsFromTagsList
	);

	eleventyConfig.addFilter('splitlines', function (input) {
		const parts = input.split(' ');
		const lines = parts.reduce(function (prev, current) {
			if (!prev.length) {
				return [current];
			}

			let lastOne = prev[prev.length - 1];

			if (lastOne.length + current.length > 19) {
				return [...prev, current];
			}

			prev[prev.length - 1] = lastOne + ' ' + current;

			return prev;
		}, []);

		return lines;
	});

	// Nunjucks filters
	eleventyConfig.addNunjucksFilter('year', function () {
		const date = new Date();
		return date.getFullYear();
	});

	// Collections
	eleventyConfig.addCollection('tagList', tagList);
	eleventyConfig.addCollection('allposts', (collection) => {
		const returnPostCollection = collection
			.getFilteredByGlob('./src/content/posts/**/*.md')
			.filter(livePosts)
			.filter(removeDrafts);

		return returnPostCollection;
	});
	eleventyConfig.addCollection('posts', (collection) => {
		const returnPostCollection = collection
			.getFilteredByGlob('./src/content/posts/**/*.md')
			.filter(removeWeeknotes)
			.filter(livePosts)
			.filter(removeDrafts);

		return returnPostCollection;
	});

	eleventyConfig.addCollection('weeknotes', (collection) => {
		const returnPostCollection = collection
			.getFilteredByGlob('./src/content/posts/**/*.md')
			.filter(showWeeknotes)
			.filter(livePosts)
			.filter(removeDrafts);

		return returnPostCollection;
	});

	eleventyConfig.addPassthroughCopy('src/robots.txt');
	eleventyConfig.addPassthroughCopy('src/assets/images');
	eleventyConfig.addPassthroughCopy('src/assets/fonts');
	eleventyConfig.addPassthroughCopy('src/assets/js');
	eleventyConfig.addPassthroughCopy('src/assets/postcss');
	eleventyConfig.addPassthroughCopy('_redirects');
	eleventyConfig.addPassthroughCopy('functions');

	/* Markdown Plugins */

	let options = {
		html: true,
		breaks: true,
		linkify: true,
	};

	let opts = {
		// permalink: true,
		// permalinkClass: 'direct-link',
		// permalinkSymbol: '#',
	};

	eleventyConfig.setLibrary(
		'md',
		markdownIt(options).use(markdownItAnchor, opts)
	);

	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function (err, browserSync) {
				const content_404 = fs.readFileSync('src/404.md');

				browserSync.addMiddleware('*', (req, res) => {
					// Provides the 404 content without redirect.
					res.write(content_404);
					res.end();
				});
			},
		},
	});

	eleventyConfig.on('afterBuild', () => {
		const socialPreviewImagesDir = 'dist/img/social-preview-images/';
		fs.readdir(socialPreviewImagesDir, function (err, files) {
			if (files?.length > 0) {
				files.forEach(function (filename) {
					if (filename.endsWith('.svg')) {
						let imageUrl = socialPreviewImagesDir + filename;
						Image(imageUrl, {
							formats: ['jpeg'],
							outputDir: './' + socialPreviewImagesDir,
							filenameFormat: function (
								id,
								src,
								width,
								format,
								options
							) {
								let outputFilename = filename.substring(
									0,
									filename.length - 4
								);

								return `${outputFilename}.${format}`;
							},
						});
					}
				});
			}
		});
	});

	eleventyConfig.addFilter('webmentionsByUrl', (webmentions, url) => {
		return (
			webmentions.filter(
				(webmention) => webmention['wm-target'] === url
			) ?? []
		);
	});
	eleventyConfig.addFilter('getLikes', (webmentions) => {
		return (
			webmentions.filter(
				(webmention) => webmention['wm-property'] === 'like-of'
			) ?? []
		);
	});
	eleventyConfig.addFilter('getReplies', (webmentions) => {
		return (
			webmentions.filter(
				(webmention) => webmention['wm-property'] === 'in-reply-to'
			) ?? []
		);
	});

	return {
		templateFormats: ['md', 'njk', '11ty.js', 'html'],

		// If your site lives in a different subdirectory, change this.
		// Leading or trailing slashes are all normalized away, so don’t worry about it.
		// If you don’t have a subdirectory, use ' or '/' (they do the same thing)
		// This is only used for URLs (it does not affect your file structure)
		pathPrefix: '/',

		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		passthroughFileCopy: true,
		dir: {
			input: 'src',
			output: 'dist',
			data: '_data',
		},
	};
}
