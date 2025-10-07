// /var/www/html/wormpilled/src/routes/post/[slug]/+page.js
import allPosts from '$lib/posts/posts.json';
import { error } from '@sveltejs/kit';

// Create a definitive list of published posts, which will be the source of truth.
const publishedPosts = allPosts.filter((p) => p.draft === false);

// Helper function to get the correct date for sorting, prioritizing 'date_published'.
const getSortableDate = (post) => {
	if (post.date_published && typeof post.date_published === 'number' && post.date_published > 0) {
		return post.date_published * 1000;
	}
	// Fallback to the string date, which Date.parse can handle.
	return Date.parse(post.date);
};

// Sort posts by date, most recent first, to establish navigation order.
publishedPosts.sort((a, b) => getSortableDate(b) - getSortableDate(a));

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	// Only generate entries for published posts.
	return publishedPosts.map((post) => ({
		slug: post.slug
	}));
}

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const post = publishedPosts.find((p) => p.slug === params.slug);

	if (!post) {
		error(404, 'Not found');
	}

	// Dynamically find the current post's index in the sorted list.
	const currentIndex = publishedPosts.findIndex((p) => p.slug === params.slug);

	// Determine the previous (newer) and next (older) posts from the sorted list.
	const prevPost = currentIndex > 0 ? publishedPosts[currentIndex - 1] : null;
	const nextPost = currentIndex < publishedPosts.length - 1 ? publishedPosts[currentIndex + 1] : null;

	// Construct the navigation object on the fly, ensuring links are always valid.
	const navigation = {
		prev: prevPost ? { slug: prevPost.slug, title: prevPost.title } : null,
		next: nextPost ? { slug: nextPost.slug, title: nextPost.title } : null
	};

	const isSmallPost = post.htmlContent.length < 1000;

	return {
		post,
		isSmallPost,
		navigation
	};
}

export const prerender = true;