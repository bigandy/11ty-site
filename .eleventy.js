import fs from 'fs';
import Image from '@11ty/eleventy-img';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginRss from '@11ty/eleventy-plugin-rss';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

// Filters
import { htmlDateString } from './src/_11ty/filters/htmlDateString.js';
import { readableDate } from './src/_11ty/filters/readableDate.js';
import { firstNElements } from './src/_11ty/filters/firstNElements.js';
import { splitLinesFilter } from './src/_11ty/filters/splitLines.js';
import { jsMinFilter } from './src/_11ty/filters/jsMin.js';

import { removeDraftsFromTagsListFilter } from './src/_11ty/filters/removeDraftsfromTagsList.js';

import {
	replaceSlashesFilter,
	readablePostDateFilter,
	encodeurlFilter,
	yearFilter,
	getWebmentionsByUrlFilter,
	getLikesFilter,
	getRepliesFilter,
} from './src/_11ty/filters/utils.js';

// Components
import Book from './src/_includes/components/book.js';
import PageTitle from './src/_includes/components/page-title.js';

import transformCSS from './src/utils/transform-css.js';
import optimizeHTML from './src/_11ty/optimize-html.js';

// Collections
import { allPostsCollection } from './src/_11ty/collections/allPosts.js';
import { tagListCollection } from './src/_11ty/collections/tagList.js';
import { weeknotesCollection } from './src/_11ty/collections/weeknotes.js';
import { postsCollection } from './src/_11ty/collections/posts.js';

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
	eleventyConfig.addShortcode('PageTitle', PageTitle);

	eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

	eleventyConfig.addNunjucksAsyncShortcode('postcss', transformCSS);

	// Filters
	eleventyConfig.addNunjucksAsyncFilter('jsmin', jsMinFilter);
	eleventyConfig.addFilter('readableDate', readableDate);
	eleventyConfig.addFilter('readablePostDate', readablePostDateFilter);
	eleventyConfig.addFilter('encodeurl', encodeurlFilter);

	eleventyConfig.addFilter('replaceSlashes', replaceSlashesFilter);

	eleventyConfig.addFilter('htmlDateString', htmlDateString);
	eleventyConfig.addFilter('firstNElements', firstNElements);
	eleventyConfig.addFilter(
		'removeDraftsFromTagsList',
		removeDraftsFromTagsListFilter
	);

	eleventyConfig.addFilter('webmentionsByUrl', getWebmentionsByUrlFilter);
	eleventyConfig.addFilter('getLikes', getLikesFilter);
	eleventyConfig.addFilter('getReplies', getRepliesFilter);
	eleventyConfig.addFilter('splitlines', splitLinesFilter);

	// Nunjucks filters
	eleventyConfig.addNunjucksFilter('year', yearFilter);

	// Collections
	eleventyConfig.addCollection('tagList', tagListCollection);
	eleventyConfig.addCollection('allposts', allPostsCollection);

	eleventyConfig.addCollection('posts', postsCollection);

	eleventyConfig.addCollection('weeknotes', weeknotesCollection);

	eleventyConfig.addPassthroughCopy('src/robots.txt');
	eleventyConfig.addPassthroughCopy('src/assets/images');
	eleventyConfig.addPassthroughCopy('src/assets/fonts');
	eleventyConfig.addPassthroughCopy('src/assets/js');
	eleventyConfig.addPassthroughCopy('src/assets/postcss');
	eleventyConfig.addPassthroughCopy('_redirects');
	eleventyConfig.addPassthroughCopy('functions');

	/* Markdown Plugins */
	eleventyConfig.setLibrary(
		'md',
		markdownIt({
			html: true,
			breaks: true,
			linkify: true,
		}).use(markdownItAnchor, {
			// permalink: true,
			// permalinkClass: 'direct-link',
			// permalinkSymbol: '#',
		})
	);

	// eleventyConfig.setBrowserSyncConfig({
	// 	callbacks: {
	// 		ready: function (err, browserSync) {
	// 			const content_404 = fs.readFileSync('src/404.md');

	// 			browserSync.addMiddleware('*', (req, res) => {
	// 				// Provides the 404 content without redirect.
	// 				res.write(content_404);
	// 				res.end();
	// 			});
	// 		},
	// 	},
	// });

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
