import type { Handler, HandlerEvent } from '@netlify/functions';
import slugify from '@sindresorhus/slugify';
import querystring from 'node:querystring';

// Use GitHub's Octokit and a plugin to commit our newly created posts to a repo
import { Octokit } from '@octokit/rest';
import OctoKitMultipleFilesPlugin from 'octokit-commit-multiple-files';

const UpdatedOctokit = Octokit.plugin(OctoKitMultipleFilesPlugin);

// Octokit = Octokit.plugin(require('octokit-commit-multiple-files'));
const octokit = new UpdatedOctokit({
	auth: process.env.GITHUB_ACCESS_TOKEN,
});

const getURLDate = (str) => {
	const time = str.toLocaleString('en-GB', {
		hour12: false,
	});
	return time;
};

// export default async (req: Request) => {
// 	const authorization = req.headers.get('authorization');

// 	const { content } = querystring.parse(req.url.split('?')[1]);

// 	console.log({
// 		url: req.url,
// 		method: req.method,
// 		headers: req.headers,
// 		content,
// 	});

// 	// return Response.json({
// 	// 	// req: await req.json(),
// 	// 	message: 'Test',
// 	// });

// 	// 	// 	// Check if request matches token we expect from Quill.
// 	if (
// 		!authorization ||
// 		authorization != 'Bearer ' + process.env.QUILL_TOKEN
// 	) {
// 		// 		// Respond with 401 Unauthorized and some debugging messaging
// 		return new Response(
// 			"Looks like you don't have the right bearer token, dorkboy.",
// 			{
// 				status: 401,
// 			}
// 		);
// 	}
// 	// else {
// 	// 	return new Response('All is good in the western woods', {
// 	// 		status: 200,
// 	// 	});
// 	// }
// 	// Get the content of the post out
// 	// const { content } = querystring.parse(req.url);
// 	// Get the time the build is occurring for frontmatter and filenaming
// 	const date = new Date();
// 	const filename = slugify(getURLDate(date));
// 	// Convert date and content into Markdown template
// 	const template = `---
// date: ${date.toISOString()}
// ---
// ${decodeURIComponent(content as string)}`;
// 	// Create files in repo

// 	return await octokit.repos
// 		.createOrUpdateFileContents({
// 			owner: process.env.GITHUB_USERNAME!,
// 			repo: process.env.GITHUB_REPO_NAME!,
// 			branch: 'main',
// 			content: Buffer.from(template).toString('base64'),
// 			path: `src/content/notes/${filename}.md`,
// 			message: `📝 - Adding note: ${filename}`,
// 		})
// 		.then(() => {
// 			// Return the 201 Created response and the location of the newly-created post
// 			// This actually expects a more specific location than the /notes path, so
// 			// that's one enhancement that could be made.
// 			// https://www.w3.org/TR/micropub/#h-response
// 			return new Response(null, {
// 				status: 201,
// 				headers: {
// 					Location: `https://${process.env.DOMAIN_NAME}/notes`,
// 				},
// 			});
// 		})
// 		.catch((error) => {
// 			console.log('error', error);
// 			return new Response(error, {
// 				status: 400,
// 				// body: JSON.stringify(error),
// 			});
// 		});
// };

export const handler: Handler = async (event: HandlerEvent) => {
	// console.log({ event, context });
	// Check if request matches token we expect from Quill.
	if (
		!event.headers['authorization'] ||
		event.headers['authorization'] != 'Bearer ' + process.env.QUILL_TOKEN
	) {
		// Respond with 401 Unauthorized and some debugging messaging
		return {
			statusCode: 401,
			body: "Looks like you don't have the right bearer token, dorkboy.",
		};
	}
	// Get the content of the post out
	const { content, ...rest } = querystring.parse(event.body!);
	console.log({ body: event.body, categories: rest['category[]'] });
	// Get the time the build is occurring for frontmatter and filenaming
	const date = new Date();
	const filename = slugify(getURLDate(date));

	// Convert date and content into Markdown template
	const template = `---
date: ${date.toISOString()}
categories: [${rest['category[]']}]
---
${decodeURIComponent(content as string)}`;

	// Create files in repo
	return octokit
		.createOrUpdateFiles({
			owner: process.env.GITHUB_USERNAME,
			repo: process.env.GITHUB_REPO_NAME,
			branch: 'main',
			changes: [
				{
					message: `📝 - Adding note: ${filename}`,
					files: {
						// Create our markdown file in the content directory
						[`src/content/notes/${filename}.md`]: {
							contents: Buffer.from(template).toString('base64'),
						},
						// Create a JSON file that indicates our most-recently-published file.
						// (Used in the deploy-succeeded function)
						// 'functions/micropub-latest.json': `{ "latest": "notes/${filename}.md" }`,
					},
				},
			],
		})
		.then(() => {
			// Return the 201 Created response and the location of the newly-created post
			// This actually expects a more specific location than the /notes path, so
			// that's one enhancement that could be made.
			// https://www.w3.org/TR/micropub/#h-response
			return {
				statusCode: 201,
				headers: {
					Location: `http://${process.env.DOMAIN_NAME}/notes`,
				},
			};
		})
		.catch((error) => {
			console.log('error', error);
			return {
				statusCode: 400,
				body: JSON.stringify(error),
			};
		});
};
