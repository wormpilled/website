// /var/www/html/wormpilled/src/routes/authors/[slug]/+page.js
import allPosts from '$lib/posts/posts.json';
import allAuthors from '$lib/data/authors.json';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const author = allAuthors[params.slug];

	if (!author) {
		error(404, 'Author not found');
	}

	// Filter posts by author slug and exclude drafts.
	const authorPosts = allPosts.filter((p) => p.author.slug === params.slug && p.draft === false);

	// Group posts by year and then by month
	const postsByYearMonth = authorPosts.reduce((acc, post) => {
		const date = new Date(post.date);
		const year = date.getFullYear();
		const month = date.toLocaleString('default', { month: 'long' });

		if (!acc[year]) {
			acc[year] = {};
		}
		if (!acc[year][month]) {
			acc[year][month] = [];
		}
		acc[year][month].push(post);
		return acc;
	}, {});

	return {
		author,
		postsByYearMonth
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return Object.keys(allAuthors).map((slug) => ({ slug }));
}

export const prerender = true;