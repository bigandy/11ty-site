import { AssetCache } from "@11ty/eleventy-fetch";
import { Client } from "@notionhq/client";

const notionKey = process.env.NOTION_KEY;
const database_id = process.env.NOTION_DB;

const notion = new Client({
	auth: notionKey,
});


export default async function () {
	try {
		// check if in cache here.
		// Pass in your unique custom cache key
		const asset = new AssetCache("notion_book_list");

		// check if the cache is fresh within the last day
		if (asset.isCacheValid("1d")) {
			// if so, return the cached value
			return asset.getCachedValue();
		}

		const database = await notion.databases.retrieve({
			database_id,
		});

		const { results } = await notion.dataSources.query({
			data_source_id: database.data_sources[0].id,
		});

		// Go through the list and get the thumbnail for each image;
		const list = results.map(async (book) => {
			const bookTitle =
				book.properties.Name.title[0]?.plain_text ?? "unknown title";
			const bookAuthor =
				book.properties?.Author.rich_text[0]?.plain_text ?? "unknown author";

			const finishedDate = book.properties["Date Finished"]?.date?.start || "";
			const rating = book.properties["Rating (out of 10)"]?.select?.name;
			let thumbnail = book.properties?.Image?.url ?? null;
			const bookIsFrench = book.properties?.French?.checkbox;
			const bookIsAudio = book.properties?.["Audio Book"]?.checkbox;

			// if we don't have the thumbnail, call googleBookSearch to get from API
			if (!thumbnail) {
				// thumbnail = await googleBookSearch(bookTitle, bookAuthor);
				thumbnail = "";
			}

			return {
				bookIsFrench,
				bookIsAudio,
				bookTitle,
				bookAuthor,
				finishedDate,
				thumbnail: thumbnail?.replaceAll("http:", "https:"),
				rating: Number(rating),
			};
		});

		const books = (await Promise.all([...list])).filter(({finishedDate}) => finishedDate !== '');

		await asset.save(books, "json");

		return books;
	} catch (error) {
		console.error("error in getting books", error);

		return [];
	}
};

const googleBookSearch = async (title, author) => {
	try {
		const results = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${encodeURI(
				title + author,
			)}`,
		);
		const json = await results.json();

		console.log({json})

		// take the first, assume that it is the correct one.
		const thumbnail = json?.items[0].volumeInfo?.imageLinks?.thumbnail ?? null;
		return thumbnail;
	} catch (error) {
		console.error(error);
		return "";
	}
};
