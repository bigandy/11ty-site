function Book(book) {
	const bookTitle = book.book.properties.Name.title[0].plain_text;

	console.log({
		book,
		// properties: book.book.properties.Name.title[0].plain_text,
		bookTitle,
	});

	return `<div class="book">
	<h2 class="book-title">${bookTitle}</h2>

</div>`;
}

module.exports = Book;
