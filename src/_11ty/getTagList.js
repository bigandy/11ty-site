export default function getTagList(collection) {
	const tagSet = new Set();

	for (const item of collection.getAll()) {
		if ("tags" in item.data) {
			let tags = item.data.tags;

			tags = tags.filter((item) => {
				switch (item) {
					// this list should match the `filter` list in tags.njk
					case "all":
					case "nav":
					case "footnav":
					case "post":
					case "posts":
					case "books":
						return false;
				}

				return true;
			});

			for (const tag of tags) {
				tagSet.add(tag);
			}
		}
	}

	// returning an array in addCollection works in Eleventy 0.5.3
	return [...tagSet];
}
