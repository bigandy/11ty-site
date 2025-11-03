import { DateTime } from 'luxon';

export const showDrafts = process.env.ELEVENTY_DRAFTS === 'true';

// Present and past posts only
// https://remysharp.com/2019/06/26/scheduled-and-draft-11ty-posts
const now = new Date();

export const livePostsFilter = (p) => p.date <= now;

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
	return DateTime.fromJSDate(dateObj, {
		zone: 'Europe/London',
	})
		.setLocale('en')
		.toLocaleString({ locale: 'en-gb' })
		.replaceAll('/', '-');
};

export const encodeurlFilter = (title) => {
	return encodeURI(title).replaceAll(' ', '');
};

export const yearFilter = () => {
	const date = new Date();
	return date.getFullYear();
};

export const getRepliesFilter = (webmentions) => {
	return (
		webmentions.filter(
			(webmention) => webmention['wm-property'] === 'in-reply-to'
		) ?? []
	);
};

export const getLikesFilter = (webmentions) => {
	return (
		webmentions.filter(
			(webmention) => webmention['wm-property'] === 'like-of'
		) ?? []
	);
};

export const getWebmentionsByUrlFilter = (webmentions, url) => {
	// console.log({ webmentions });
	return (
		webmentions.filter((webmention) => webmention['wm-target'] === url) ??
		[]
	);
};
