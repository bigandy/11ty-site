const fs = require('fs');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const htmlDateString = require('./src/_11ty/filters/htmlDateString.js');
const readableDate = require('./src/_11ty/filters/readableDate.js');
const firstNElements = require('./src/_11ty/filters/firstNElements.js');
const tagList = require('./src/_11ty/getTagList');
const isDev = process.argv.includes('dev');

if (process.argv)
	module.exports = function(config) {
		config.addPlugin(pluginSyntaxHighlight);
		config.setDataDeepMerge(true);

		config.addLayoutAlias('post', 'layouts/post.njk');

		// Present and past posts only
		// https://remysharp.com/2019/06/26/scheduled-and-draft-11ty-posts
		const now = new Date();
		const livePosts = p => p.date <= now;
		const removeDraftsFromTagsList = drafts => {
			if (isDev) {
				return drafts;
			}

			return drafts.filter(draft => {
				if (!draft.data) {
					return;
				}

				if (draft.data.draft !== true) {
					return draft;
				}
			});
		};

		const removeDrafts = p => {
			if (isDev) {
				return p;
			}

			return p.data.draft !== true;
		};

		// Filters
		config.addFilter('readableDate', readableDate);
		config.addFilter('htmlDateString', htmlDateString);
		config.addFilter('firstNElements', firstNElements);
		config.addFilter('removeDraftsFromTagsList', removeDraftsFromTagsList);

		config.addCollection('posts', collection => {
			return collection
				.getFilteredByGlob('./src/site/posts/*.md')
				.filter(livePosts)
				.filter(removeDrafts);
		});

		// Collections
		config.addCollection('tagList', tagList);

		config.addPassthroughCopy('src/site/assets/img');
		config.addPassthroughCopy('src/site/assets/css');
		config.addPassthroughCopy('src/site/assets/fonts');
		config.addPassthroughCopy('src/site/assets/js');

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

		config.setLibrary(
			'md',
			markdownIt(options).use(markdownItAnchor, opts)
		);

		config.setBrowserSyncConfig({
			callbacks: {
				ready: function(err, browserSync) {
					const content_404 = fs.readFileSync('src/site/404.md');

					browserSync.addMiddleware('*', (req, res) => {
						// Provides the 404 content without redirect.
						res.write(content_404);
						res.end();
					});
				}
			}
		});

		return {
			templateFormats: ['md', 'njk', '11ty.js'],

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
				input: 'src/site',
				data: '_data',
				output: 'dist'
			}
		};
	};
