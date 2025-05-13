import { removeWeeknotesFilter } from '../filters/removeWeeknotes.js';
import { livePostsFilter, removeDraftsFilter } from '../filters/utils.js';

export const postsCollection = (collection) => {
	const returnPostCollection = collection
		.getFilteredByGlob('./src/content/posts/**/*.md')
		.filter(removeWeeknotesFilter)
		.filter(livePostsFilter)
		.filter(removeDraftsFilter);

	return returnPostCollection;
};
