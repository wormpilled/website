// /var/www/html/wormpilled/src/routes/find/[tag]/+page.js
import allTags from '$lib/data/tags.json';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const tagData = allTags[params.tag];

	if (!tagData) {
		error(404, 'Tag not found');
	}

	// The `draft: false` filter has been removed from the content list.
	// All content associated with the tag will now be displayed.
	return {
		tag: tagData,
		tagSlug: params.tag
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return Object.keys(allTags).map((tag) => ({ tag }));
}

export const prerender = true;