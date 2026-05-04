import { Temporal } from "temporal-polyfill-lite";

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
	const [month, day, year] = dateObj.toLocaleDateString('en-gb').split('/').map(s => +s);
			// console.log({month, day, year});

	const date = Temporal.PlainDate.from({ year, month, day });

	// const { day, month, year } = formatDate;
	const outputDay = `${day}${getNumberSuffix(day)}`;

	// return 'TODO';
	return `${outputDay} ${date.toLocaleString('en-gb', { month: "long" })} ${year}`;
};
