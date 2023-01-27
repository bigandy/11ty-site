const { DateTime } = require('luxon');

const getNumberSuffix = (num) => {
	if (num === 11 || num === 12 || num === 13) {
		return 'th';
	}

	const lastDigit = num.toString().slice(-1);

	switch (lastDigit) {
		case '1':
			return 'st';
		case '2':
			return 'nd';
		case '3':
			return 'rd';
		default:
			return 'th';
	}
};

const readableDate = (dateObj) => {
	const formatDate = DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
		'd-LLLL-yyyy'
	);

	const [day, month, year] = formatDate.split('-');
	const outputDay = `${day}${getNumberSuffix(day)}`;

	return `${outputDay} ${month} ${year}`;
};

module.exports = readableDate;
