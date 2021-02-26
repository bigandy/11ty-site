const path = require('path');
const postcss = require('postcss');
const fs = require('fs').promises;

module.exports = async (filename) => {
	const rawFilepath = path.join(
		__dirname,
		`../../_includes/${filename.replace(/'/g, '')}`
	);
	const code = await fs.readFile(rawFilepath);

	return await postcss([
		require('precss'),
		require('postcss-import'),
		require('postcss-custom-selectors'),
		// require('autoprefixer'),
		require('cssnano'),
	])
		.process(code, { from: rawFilepath })
		.then((result) => result.css)
		.catch((e) => console.log('error', e));
};
