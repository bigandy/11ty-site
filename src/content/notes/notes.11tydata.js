import slugify from "@sindresorhus/slugify";

const getURLDate = (str) => {
	const time = str.toLocaleString("en-GB", {
		hour12: false,
	});
	return time;
};

export default function () {
	return {
		tags: "notes",
		layout: "components/note.njk",
		permalink: (data) => `/notes/${slugify(getURLDate(data.date))}/index.html`,
	};
}
