import type { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
	// Grab the latest-created file and convert it to latest-created URL
	const { latest } = require('./micropub-latest.json');
	const latestPublishedUrl = `https://${
		process.env.DOMAIN_NAME
	}/${latest.replace('.md', '/')}`;

	try {
		// Create our POST request to brid.gy asking them to syndicate to Mastodon.
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

		const urlencoded = new URLSearchParams();
		urlencoded.append('target', 'https://brid.gy/publish/mastodon');
		urlencoded.append('source', latestPublishedUrl);

		await fetch('https://brid.gy/publish/webmention', {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow',
		});

		return {
			statusCode: 200,
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 400,
		};
	}
};
