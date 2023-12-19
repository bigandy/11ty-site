import path from 'path';
import postcss from 'postcss';
import fs from 'fs/promises';

import postCSSImport from 'postcss-import';

import postCSSNesting from 'postcss-nesting';
import CSSNano from 'cssnano';

import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;

export default async (filename) => {
	const rawFilepath = path.join(
		__dirname,
		`../../_includes/${filename.replace(/'/g, '')}`
	);

	const code = await fs.readFile(rawFilepath);

	return await postcss([postCSSImport, postCSSNesting, CSSNano])
		.process(code, { from: rawFilepath })
		.then((result) => {
			return result.css;
		})
		.catch((e) => {
			console.log('error', e);
			throw new Error(e.message);
		});
};
