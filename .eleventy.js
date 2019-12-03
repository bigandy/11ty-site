const fs = require('fs');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const htmlDateString = require('./_filters/htmlDateString.js');
const readableDate = require('./_filters/readableDate.js');
const firstNElements = require('./_filters/firstNElements.js');
const tagList = require('./_11ty/getTagList');

module.exports = function(config) {
	config.addPlugin(pluginSyntaxHighlight);
	config.setDataDeepMerge(true);

	config.addLayoutAlias('post', 'layouts/post.njk');

	// Present and past posts only
	// https://remysharp.com/2019/06/26/scheduled-and-draft-11ty-posts
	const now = new Date();
	const livePosts = p => p.date <= now;
	const removeDraftsFromTagsList = drafts => {
		return drafts.filter(draft => {
			if (!draft.data) {
				return;
			}

			if (draft.data.draft !== true) {
				return draft;
			}
		});
	};

	const removeDrafts = p => p.data.draft !== true;

	// Filters
	config.addFilter('readableDate', readableDate);
	config.addFilter('htmlDateString', htmlDateString);
	config.addFilter('firstNElements', firstNElements);
	config.addFilter('removeDraftsFromTagsList', removeDraftsFromTagsList);

	config.addCollection('posts', collection => {
		return collection
			.getFilteredByGlob('./posts/*.md')
			.filter(livePosts)
			.filter(removeDrafts);
	});

	// Collections
	config.addCollection('tagList', tagList);

	config.addPassthroughCopy('assets/img');
	config.addPassthroughCopy('assets/css');
	config.addPassthroughCopy('assets/fonts');
	config.addPassthroughCopy('assets/js');

	/* Markdown Plugins */
	let markdownIt = require('markdown-it');
	let markdownItAnchor = require('markdown-it-anchor');
	let options = {
		html: true,
		breaks: true,
		linkify: true
	};

	let opts = {
		permalink: true,
		permalinkClass: 'direct-link',
		permalinkSymbol: '#'
	};

	config.setLibrary('md', markdownIt(options).use(markdownItAnchor, opts));

	config.setBrowserSyncConfig({
		callbacks: {
			ready: function(err, browserSync) {
				const content_404 = fs.readFileSync('_site/404.html');

				browserSync.addMiddleware('*', (req, res) => {
					// Provides the 404 content without redirect.
					res.write(content_404);
					res.end();
				});
			}
		}
	});

	return {
		templateFormats: ['md', 'njk', 'html', 'liquid', '11ty.js'],

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
			input: '.',
			includes: '_includes',
			data: '_data',
			output: '_site'
		}
	};
};
