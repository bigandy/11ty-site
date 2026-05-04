import { getPostDate } from "./utils.js";

// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
export const htmlDateString = (dateObj) => {
	try {
		return getPostDate(dateObj);
	} catch (error) {
		console.error('an error in htmlDateString ' + error, dateObj);
	}
};
