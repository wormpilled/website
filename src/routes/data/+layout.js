// /var/www/html/wormpilled/src/routes/data/+layout.js
import dataPages from '$lib/posts/data.json';

/** @type {import('./$types').LayoutLoad} */
export function load() {
	return {
		archives: dataPages,
		isDataLayout: true
	};
}

export const prerender = true;