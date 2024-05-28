import slugify from '@sindresorhus/slugify';

export default function PageTitle({ title, id }) {
	const viewTransitionName = id !== '' ? id : slugify(title);

	return `<h1 style="view-transition-name:${viewTransitionName}">${title}</h1>`;
}
