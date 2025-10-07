// /var/www/html/wormpilled/src/routes/find/+page.js
import tags from '$lib/data/tags.json';

/** @type {import('./$types').PageLoad} */
export function load() {
	const tagList = Object.entries(tags)
		.map(([slug, data]) => {
			// Removed filter for draft: false to ensure all tags are counted.
			return {
				slug,
				name: data.name,
				count: data.content.length
			};
		})
		.filter((tag) => tag.count > 0); // Exclude tags with no content at all.

	// Sort alphabetically by name
	tagList.sort((a, b) => a.name.localeCompare(b.name));

	return {
		tags: tagList
	};
}

export const prerender = true;