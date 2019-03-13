const { DateTime } = require('luxon');

// Get the past/present not future posts.
const pastPosts = array => {
	const todaysDate = Date.now().toString();

	let retArray = array.filter(post => {
		const postDate = DateTime.fromJSDate(post.data.date, {
			zone: 'utc'
		}).toFormat('x');

		if (postDate <= todaysDate) {
			return post;
		}
	});

	return retArray;
};

module.exports = pastPosts;
