const { DateTime } = require('luxon');

const readableDate = dateObj => {
	return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd-LL-yyyy');
};

module.exports = readableDate;
