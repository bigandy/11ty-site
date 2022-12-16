const htmlDateString = require('../../_11ty/filters/htmlDateString.js');

function Book({ book }) {
	const { bookTitle, bookAuthor, createdDate, finishedDate, thumbnail } =
		book;
	const isFinished = Boolean(finishedDate !== '');
	return `<div class="book ${isFinished ? 'book--finished' : ''}">
		<div class="book-meta">
			<h2 class="book-title">${bookTitle}</h2>

			<p>Author: ${bookAuthor}</p>
			<p>Date: ${htmlDateString(new Date(createdDate))}</p>

			${isFinished ? `<p>Finished on: ${finishedDate}</p>` : ''}
		</div>
	  	${
			thumbnail
				? `<img width="128" height="192" src="${thumbnail}" alt="thumbnail for ${bookTitle}" />`
				: '<img width="128" height="192" src="" loading="lazy" alt="No Book Image Found" />'
		}
	</div>`;
}

module.exports = Book;
