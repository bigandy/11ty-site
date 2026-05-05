const padStartNumber = (number) => {
	return `0${number}`.slice(-2);
};

const getMonthYear = (date) => {
	return `${padStartNumber(date.month)}-${date.year}`;
};

const getPlainDateFromString = (monthYearString) => {
	const [month, year] = monthYearString.split("-");

	const plainDate = Temporal.PlainDate.from({
		day: 1,
		month: +month,
		year: +year,
	});

	return plainDate;
};

const getGroupedBooks = (books) => {
	const group = Object.groupBy(books, ({ finishedDate }) => {
		const {month, year} = Temporal.PlainDate.from(finishedDate);

		return `${padStartNumber(month)}-${year}`;
	});

	const groups = Object.entries(group);

	const sortedGroups = groups
	    .sort(([a], [b]) => {
			const aDate = getPlainDateFromString(a);
			const bDate = getPlainDateFromString(b);

			return Temporal.PlainDate.compare(bDate, aDate);
	    })
	    .map(([month, books]) => {
	        return [month, books.sort(sortByFinishDate)];
	    });

	return sortedGroups;
};

const sortByFinishDate = (a, b) => {
	return Temporal.PlainDate.compare(b.finishedDate, a.finishedDate);
};

export default function Book({ books }) {
	if (!books) {
		return "no books found";
	}

	return getGroupedBooks(books)
		.map(([month, books]) => {
			const monthFomatted = getPlainDateFromString(month).toLocaleString('en', {
                year: "numeric",
                month: "long",
            });

			return `<div class="month">
				<h2 class="month-title">${monthFomatted}</h2>
				<div class="books">
				${books.map((book) => {
						const { bookTitle, bookAuthor, finishedDate, thumbnail } = book;

						const {year, month, day} = Temporal.PlainDate.from(finishedDate);


						return `<div class="book">
							<h3>${bookTitle}</h3>
							<p>${bookAuthor}</p>
							<p>Finished on: ${padStartNumber(day)}-${padStartNumber(month)}-${year}</p>
							<img src="${thumbnail}" alt="${bookTitle}"  loading="lazy" />
						</div>`;
					})
					.join(" ")}
			</div>
		</div>`;
		})
		.join(" ");
}
