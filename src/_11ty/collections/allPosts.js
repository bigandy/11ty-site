import { livePostsFilter, removeDraftsFilter } from '../filters/utils.js';

export const allPostsCollection = (collection) => {
	const returnPostCollection = collection
		.getFilteredByGlob('./src/content/posts/**/*.md')
		.filter(livePostsFilter)
		.filter(removeDraftsFilter);

	return returnPostCollection;
};
