import posts from '$lib/posts/posts.json';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return posts.map(post => ({
		slug: post.slug
	}));
}

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		error(404, 'Not found');
	}

	return {
		post
	};
}

export const prerender = true;