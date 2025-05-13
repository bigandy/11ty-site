import {
	showWeeknotesFilter,
	livePostsFilter,
	removeDraftsFilter,
} from '../filters/utils.js';

export const weeknotesCollection = (collection) => {
	const returnPostCollection = collection
		.getFilteredByGlob('./src/content/posts/**/*.md')
		.filter(showWeeknotesFilter)
		.filter(livePostsFilter)
		.filter(removeDraftsFilter);

	return returnPostCollection;
};
