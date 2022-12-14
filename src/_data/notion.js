const { Client } = require('@notionhq/client');

const { AssetCache } = require('@11ty/eleventy-fetch');

const notion = new Client({
	auth: process.env.NOTION_KEY,
});
const Notion_DB_ID = process.env.NOTION_DB;

module.exports = async function () {
	const query = await notion.databases.query({
		database_id: Notion_DB_ID,
	});
	return query?.results || null;
};

module.exports = async function () {
	// Pass in your unique custom cache key
	// (normally this would be tied to your API URL)
	let asset = new AssetCache('notion_book_list');

	// check if the cache is fresh within the last day
	if (asset.isCacheValid('1d')) {
		// return cached data.
		return asset.getCachedValue(); // a promise
	}

	const query = await notion.databases.query({
		database_id: Notion_DB_ID,
	});

	// do some expensive operation here, this is simplified for brevity
	const queryResults = query?.results || null;

	await asset.save(queryResults, 'json');

	return queryResults;
};
