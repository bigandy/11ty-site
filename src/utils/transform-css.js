const path = require('path');
const postcss = require('postcss');
const fs = require('fs').promises;

const atImport = require('postcss-import');
const precss = require('precss');
const postcssCustomSelectors = require('postcss-custom-selectors');
const cssNano = require('cssnano');
const postCssNested = require('postcss-nested');

module.exports = async (filename) => {
	const rawFilepath = path.join(
		__dirname,
		`../../_includes/${filename.replace(/'/g, '')}`
	);
	const code = await fs.readFile(rawFilepath);

	const result = await postcss([
		precss,
		atImport,
		postcssCustomSelectors,
		postCssNested,
		cssNano,
	])
		.process(code, { from: rawFilepath })
		.then((result) => {
			// console.log(result);
			return result.css;
		})
		.catch((e) => console.log('error', e));

	return result;
};
