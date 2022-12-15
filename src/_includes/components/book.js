function Book({ book }) {
	const bookTitle = book.properties.Name.title[0].plain_text;
	const bookAuthor =
		book.properties?.Author.rich_text[0]?.plain_text || 'unknown';

	const createdDate = book.created_time;
	const finishedDate = book.properties['Date Finished']?.date?.start || '';
	console.log({
		finishedDate,
	});

	const isFinished = Boolean(finishedDate !== '');

	return `<div class="book ${isFinished ? 'book--finished' : ''}">
	<h2 class="book-title">${bookTitle}</h2>

  <p>Author: ${bookAuthor}</p>

  <p>Date: ${createdDate}</p>

  ${isFinished ? `<p>Finished on: ${finishedDate}</p>` : ''}

</div>`;
}

module.exports = Book;
