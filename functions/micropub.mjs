import querystring from 'node:querystring';
import slugify from '@sindresorhus/slugify';

// Use GitHub's Octokit and a plugin to commit our newly created posts to a repo
import { Octokit } from '@octokit/rest';
// Octokit = Octokit.plugin(require('octokit-commit-multiple-files'));
const octokit = new Octokit({
	auth: process.env.GITHUB_ACCESS_TOKEN,
});

const getURLDate = (str) => {
	const time = str.toLocaleString('en-GB', {
		hour12: false,
	});
	return time;
};

export default async (req) => {
	const authorization = req.headers.get('authorization');

	console.log({ req });

	// 	// Check if request matches token we expect from Quill.
	if (
		!authorization ||
		authorization != 'Bearer ' + process.env.QUILL_TOKEN
	) {
		// 		// Respond with 401 Unauthorized and some debugging messaging
		return new Response(
			"Looks like you don't have the right bearer token, dorkboy.",
			{
				status: 401,
			}
		);
	}
	// else {
	// 	return new Response('All is good in the western woods', {
	// 		status: 200,
	// 	});
	// }
	// Get the content of the post out
	const { content } = querystring.parse(req.body);
	// Get the time the build is occurring for frontmatter and filenaming
	const date = new Date();
	const filename = slugify(getURLDate(date));
	// Convert date and content into Markdown template
	const template = `---
	date: ${date.toISOString()}
	---
	${decodeURIComponent(content)}`;
	// Create files in repo

	const contentEncoded = Base64.encode(content);

	return octokit
		.createOrUpdateFileContents({
			owner: process.env.GITHUB_USERNAME,
			repo: process.env.GITHUB_REPO_NAME,
			branch: 'main',
			content: Buffer.from(template).toString('base64'),
			path: `src/content/notes/${filename}.md`,
			// changes: [
			// 	{
			// 		message: `📝 - Adding note: ${filename}`,
			// 		files: {
			// 			// Create our markdown file in the content directory
			// 			[`src/content/notes/${filename}.md`]: {
			// 				contents: Buffer.from(template).toString('base64'),
			// 			},
			// 			// Create a JSON file that indicates our most-recently-published file.
			// 			// (Used in the deploy-succeeded function)
			// 			// 'functions/micropub-latest.json': `{ "latest": "notes/${filename}.md" }`,
			// 		},
			// 	},
			// ],
		})
		.then(() => {
			// Return the 201 Created response and the location of the newly-created post
			// This actually expects a more specific location than the /notes path, so
			// that's one enhancement that could be made.
			// https://www.w3.org/TR/micropub/#h-response
			return new Response(null, {
				statusCode: 201,
				headers: {
					Location: `https://${process.env.DOMAIN_NAME}/notes`,
				},
			});
		})
		.catch((error) => {
			console.log('error', error);
			return new Response(null, {
				statusCode: 400,
				body: JSON.stringify(error),
			});
		});
};
