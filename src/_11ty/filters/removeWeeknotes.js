export const removeWeeknotesFilter = (post) => {
	if (post.data.tags) {
		return !post.data.tags.includes('weeknotes');
	}
	return post;
};
