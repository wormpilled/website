import pages from '$lib/posts/standalone.json';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutLoad} */
export function load({ params }) {
	const page = pages.find((p) => p.slug === params.slug);

	if (!page) {
		error(404, 'Not found');
	}

	return {
		page
	};
}

export const prerender = true;