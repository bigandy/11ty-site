const { Client } = require('@notionhq/client');

const { AssetCache } = require('@11ty/eleventy-fetch');
const fetch = require('node-fetch');
const groupBy = require('lodash.groupby');
const dayjs = require('dayjs');

const notion = new Client({
	auth: process.env.NOTION_KEY,
});
const NOTION_DB_ID = process.env.NOTION_DB;

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
		const asset = new AssetCache('notion_book_list');

		// check if the cache is fresh within the last day
		if (asset.isCacheValid('1d')) {
			// if so, return the cached value
			return asset.getCachedValue();
		}

		// if not, fetch the data and cache it
		const query = await notion.databases.query({
			database_id: NOTION_DB_ID,
		});

		const queryResults = query?.results || null;

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
			let thumbnail = book.properties?.Image?.url ?? null;

			// if we don't have the thumbnail, call googleBookSearch to get from API
			if (!thumbnail) {
				thumbnail = await googleBookSearch(bookTitle, bookAuthor);
			}

			return {
				bookTitle,
				bookAuthor,
				createdDate,
				finishedDate,
				thumbnail: thumbnail?.replaceAll('http:', 'https:'),
			};
		});

		const books = await Promise.all([...list]);

		const groupedBooks = groupBy(books, (book) => {
			const finishedDate = dayjs(book.finishedDate);
			return finishedDate.isValid()
				? finishedDate.format('MM-YYYY')
				: 'unfinished';
		});

		// Currently, I do not want to do anythihng with the unfinished books
		// This removes the unfinished key from the object
		const { unfinished, ...months } = groupedBooks;

		await asset.save(months, 'json');

		return months;
	} catch (error) {
		console.error(error);
	}
};
