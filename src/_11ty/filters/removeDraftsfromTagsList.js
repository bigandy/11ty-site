import { showDrafts } from './utils.js';

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
