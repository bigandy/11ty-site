export const showDrafts = process.env.ELEVENTY_DRAFTS === 'true';

// Present and past posts only
// https://remysharp.com/2019/06/26/scheduled-and-draft-11ty-posts
const today = Temporal.Now.plainDateISO();

export const getPostDate = postDate => {
	const [month, day, year] = postDate.toLocaleDateString('en-gb').split('/').map(s => +s);

	return Temporal.PlainDate.from({ year, month, day });
};

export const livePostsFilter = (p) => {
	const compare = Temporal.PlainDate.compare(
		today,
		getPostDate(p.date),
	);

	return compare > -1;
};

export const showWeeknotesFilter = (post) => {
	if (post.data.tags) {
		return post.data.tags.includes('weeknotes');
	}
	return post;
};

export const removeDraftsFilter = (post) => {
	if (showDrafts) {
		return post;
	}

	return post.data.draft !== true;
};

export const replaceSlashesFilter = (str) => {
	return str.replaceAll('/', '');
};

export const removeDraftsFromTagsListFilter = (drafts) => {
	if (showDrafts) {
		return drafts;
	}

	return drafts.filter((draft) => {
		if (!draft.data) {
			return;
		}

		if (draft.data.draft !== true) {
			return draft;
		}
	});
};

export const readablePostDateFilter = (dateObj) => {
	return getPostDate(dateObj);
};

export const encodeurlFilter = (title) => {
	return encodeURI(title).replaceAll(' ', '');
};

export const yearFilter = () => {
	return today.year;
};
