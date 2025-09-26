// /var/www/html/wormpilled/src/routes/standalone/[slug]/+page.js
import pages from '$lib/posts/standalone.json';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return pages.map((page) => ({
		slug: page.slug
	}));
}

export const prerender = true;
