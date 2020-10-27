const fs = require('fs');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginPWA = require('eleventy-plugin-pwa');

const htmlDateString = require('./src/_11ty/filters/htmlDateString.js');
const readableDate = require('./src/_11ty/filters/readableDate.js');
const firstNElements = require('./src/_11ty/filters/firstNElements.js');
const tagList = require('./src/_11ty/getTagList');
const isDev = process.argv.includes('dev');

if (process.argv)
	module.exports = function (config) {
		// Plugins
		config.addPlugin(pluginSyntaxHighlight);

		config.addPlugin(pluginRss);

		config.setDataDeepMerge(true);

		config.addLayoutAlias('post', 'layouts/post.njk');

		config.addNunjucksAsyncShortcode(
			'postcss',
			require('./src/utils/transform-css')
		);

		// Present and past posts only
		// https://remysharp.com/2019/06/26/scheduled-and-draft-11ty-posts
		const now = new Date();
		const livePosts = (p) => p.date <= now;
		const removeDraftsFromTagsList = (drafts) => {
			if (isDev) {
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

		const removeDrafts = (p) => {
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

		config.addCollection('posts', (collection) => {
			const returnPostCollection = collection
				.getFilteredByGlob('./src/content/posts/*.md')
				.filter(livePosts)
				.filter(removeDrafts);

			if (process.env.ELEVENTY_ENV === 'production') {
				const workboxOptions = {
					cacheId: 'andrewhudson-dev',
					swDest: './dist/sw.js',
					globPatterns: [
						...[
							...new Set(
								returnPostCollection
									.map(
										(post) =>
											`${post.template.parsed.name}/index.html`
									)
									.reverse()
									.slice(0, 10)
							),
						],
						'index.html',
						'about/index.html',
						'archive/index.html',
						'cv/index.html',
						'now/index.html',
						'design/index.html',
						'assets/js/offline.js',
						'assets/**/*',
					],
					importScripts: ['assets/js/worker.js'],
					skipWaiting: false,
				};
				config.addPlugin(pluginPWA, workboxOptions);
			}

			return returnPostCollection;
		});

		config.addCollection('books', (collection) => {
			const returnPostCollection = collection.getFilteredByGlob(
				'./src/content/books/*.md'
			);
			// .filter(livePosts)
			// .filter(removeDrafts)
			return returnPostCollection;
		});

		// Nunjucks filters
		config.addNunjucksFilter('year', function () {
			const date = new Date();
			return date.getFullYear();
		});

		// Collections
		config.addCollection('tagList', tagList);

		config.addPassthroughCopy('src/assets/images');
		config.addPassthroughCopy('src/assets/fonts');
		config.addPassthroughCopy('src/assets/js');
		config.addPassthroughCopy('src/assets/postcss');
		config.addPassthroughCopy('_redirects');

		/* Markdown Plugins */
		let markdownIt = require('markdown-it');
		let markdownItAnchor = require('markdown-it-anchor');
		let options = {
			html: true,
			breaks: true,
			linkify: true,
		};

		let opts = {
			permalink: true,
			permalinkClass: 'direct-link',
			permalinkSymbol: '#',
		};

		config.setLibrary(
			'md',
			markdownIt(options).use(markdownItAnchor, opts)
		);

		config.setBrowserSyncConfig({
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
				input: 'src',
				output: 'dist',
				data: '_data',
			},
		};
	};
