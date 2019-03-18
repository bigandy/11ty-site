const fs = require("fs");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const htmlDateString = require('./_filters/htmlDateString.js');
const readableDate = require('./_filters/readableDate.js');
const firstNElements = require('./_filters/firstNElements.js');
const pastPosts = require('./_filters/pastPosts.js');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginSyntaxHighlight);
	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

	// Filters
	eleventyConfig.addFilter("readableDate", readableDate);
	eleventyConfig.addFilter("htmlDateString", htmlDateString);
	eleventyConfig.addFilter("firstNElements", firstNElements);
	eleventyConfig.addFilter("pastPosts", pastPosts);

	// Collections
	eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("css");

	/* Markdown Plugins */
	let markdownIt = require("markdown-it");
	let markdownItAnchor = require("markdown-it-anchor");
	let options = {
		html: true,
		breaks: true,
		linkify: true
	};

	let opts = {
		permalink: true,
		permalinkClass: "direct-link",
		permalinkSymbol: "#"
	};

	eleventyConfig.setLibrary(
		"md",
		markdownIt(options).use(markdownItAnchor, opts)
	);

	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
		ready: function(err, browserSync) {
			const content_404 = fs.readFileSync("_site/404.html");

			browserSync.addMiddleware("*", (req, res) => {
				// Provides the 404 content without redirect.
				res.write(content_404);
				res.end();
			});
		}
		}
	});

	return {
		templateFormats: ["md", "njk", "html", "liquid"],

		// If your site lives in a different subdirectory, change this.
		// Leading or trailing slashes are all normalized away, so don’t worry about it.
		// If you don’t have a subdirectory, use ' or '/' (they do the same thing)
		// This is only used for URLs (it does not affect your file structure)
		pathPrefix: "/",

		markdownTemplateEngine: "liquid",
		htmlTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		passthroughFileCopy: true,
		dir: {
			input: ".",
			includes: "_includes",
			data: "_data",
			output: "_site"
		}
	};
};
