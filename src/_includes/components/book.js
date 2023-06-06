const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

function Book({ months }) {
	if (!months) {
		return 'no books found';
	}
	return Object.entries(months)
		.map(([month, books]) => {
			const monthFomatted = dayjs(month, 'MM-YYYY').format('MMMM YYYY');
			return `<div class="month">
				<h2 class="month-title">${monthFomatted}</h2>
				<div class="books">
				${books
					.map((book) => {
						const {
							bookTitle,
							bookAuthor,
							finishedDate,
							thumbnail,
						} = book;

						const isFinished = Boolean(finishedDate !== '');

						const finishedDateFormatted =
							dayjs(finishedDate).format('DD MMM YYYY');

						return `<div class="book">
							<h3>${bookTitle}</h3>
							<p>${bookAuthor}</p>
							<p>${isFinished ? 'Finished' : 'Started'}: on ${finishedDateFormatted}</p>
							<img src="${thumbnail}" alt="${bookTitle}" />
						</div>`;
					})
					.join(' ')}
			</div>
		</div>`;
		})
		.join(' ');
}

module.exports = Book;
