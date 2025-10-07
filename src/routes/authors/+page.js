// /var/www/html/wormpilled/src/routes/authors/+page.js
import allAuthors from '$lib/data/authors.json';

/** @type {import('./$types').PageLoad} */
export function load() {
	// Convert the authors object into a sorted array
	const authors = Object.values(allAuthors).sort((a, b) => a.name.localeCompare(b.name));

	return {
		authors
	};
}

export const prerender = true;