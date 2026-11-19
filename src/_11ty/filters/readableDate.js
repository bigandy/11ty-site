import { getPostDate } from './utils.js';

const getNumberSuffix = (num) => {
	if (num === 11 || num === 12 || num === 13) {
		return "th";
	}

	const lastDigit = num.toString().slice(-1);

	switch (lastDigit) {
		case "1":
			return "st";
		case "2":
			return "nd";
		case "3":
			return "rd";
		default:
			return "th";
	}
};

export const readableDate = (dateObj) => {
	try {
		const date = getPostDate(dateObj);
		const {year, day} = date;
		const outputDay = `${day}${getNumberSuffix(day)}`;

		return `${outputDay} ${
			date.toLocaleString('en-gb', { month: "long" })
		} ${year}`;
	} catch (error) {
		console.error(`readableDate ERROR: ${dateObj}`, error);
		return dateObj;
	}

};
