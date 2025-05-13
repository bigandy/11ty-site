import { minify } from 'terser';

export const jsMinFilter = async function (code, callback) {
	try {
		const minified = await minify(code);
		callback(null, minified.code);
	} catch (err) {
		console.error('Terser error: ', err);
		// Fail gracefully.
		callback(null, code);
	}
};
