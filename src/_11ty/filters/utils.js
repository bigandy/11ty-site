export const showDrafts = process.env.ELEVENTY_DRAFTS === 'true';
// Present and past posts only
// https://remysharp.com/2019/06/26/scheduled-and-draft-11ty-posts
const today = Temporal.Now.plainDateISO();

export const getPostDate = postDate => {
	try {
		const datePostDate = new Date(postDate);

		const plainDate = Temporal.PlainDate.from({
			year: datePostDate.getFullYear(),
			month: datePostDate.getMonth() + 1,
			day: datePostDate.getDate()
		});

		return plainDate;

	} catch (error) {
		console.error(`(getPostDate) ERROR: ${postDate}`, error);
	}

};

export const livePostsFilter = ({date}) => {
	try {
		const postDate = getPostDate(date);

		const compare = Temporal.PlainDate.compare(
			today,
			postDate,
		);

		return compare > -1;
	} catch (error) {
		console.error(`(livePostsFilter) ERROR: ${date}`, error);
	}
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
