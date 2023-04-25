const { Client } = require('@notionhq/client');

const { AssetCache } = require('@11ty/eleventy-fetch');

const fetch = require('node-fetch');

const notion = new Client({
	auth: process.env.NOTION_KEY,
});
const Notion_DB_ID = process.env.NOTION_DB;

const googleBookSearch = async (title, author) => {
	try {
		const results = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${encodeURI(
				title + author
			)}`
		);
		const json = await results.json();

		// take the first, assume that it is the correct one.
		const thumbnail =
			json?.items[0].volumeInfo?.imageLinks?.thumbnail ?? null;
		return thumbnail;
	} catch (error) {
		console.error(error);
		return '';
	}
};

module.exports = async function () {
	try {
		// Pass in your unique custom cache key
		// (normally this would be tied to your API URL)
		let asset = new AssetCache('notion_book_list');

		// // check if the cache is fresh within the last day
		if (asset.isCacheValid('1d')) {
			// return cached data.
			return asset.getCachedValue(); // a promise
		}

		const query = await notion.databases.query({
			database_id: Notion_DB_ID,
		});

		// do some expensive operation here, this is simplified for brevity
		const queryResults = query?.results.reverse() || null;

		// Go through the list and get the thumbnail for each image;

		const list = queryResults.map(async (book) => {
			const bookTitle =
				book.properties.Name.title[0]?.plain_text ?? 'unknown title';
			const bookAuthor =
				book.properties?.Author.rich_text[0]?.plain_text ??
				'unknown author';

			const createdDate = book.created_time;
			const finishedDate =
				book.properties['Date Finished']?.date?.start || '';

			const thumbnail = await googleBookSearch(bookTitle, bookAuthor);

			return {
				bookTitle,
				bookAuthor,
				createdDate,
				finishedDate,
				thumbnail: thumbnail?.replaceAll('http:', 'https:'),
			};
		});

		const results = await Promise.all([...list]);

		await asset.save(results, 'json');

		return results;
	} catch (error) {
		console.error(error);
	}
};
