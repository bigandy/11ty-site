import fs from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";

import postCSSImport from "postcss-import";

import CSSNano from "cssnano";
import postCSSNesting from "postcss-nesting";

import { URL } from "node:url";

const __dirname = new URL(".", import.meta.url).pathname;

export default async (filename) => {
	const rawFilepath = path.join(
		__dirname,
		`../../_includes/${filename.replace(/'/g, "")}`,
	);

	const code = await fs.readFile(rawFilepath);

	return await postcss([postCSSImport, postCSSNesting, CSSNano])
		.process(code, { from: rawFilepath })
		.then((result) => {
			return result.css;
		})
		.catch((error) => {
			console.error({ error });
			throw new Error(error.message);
		});
};
