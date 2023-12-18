import { DateTime } from 'luxon';

// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
export const htmlDateString = (dateObj) => {
	return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
};
