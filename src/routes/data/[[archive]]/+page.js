// /var/www/html/wormpilled/src/routes/data/[[archive]]/+page.js
import { error, redirect } from '@sveltejs/kit';

// Creates a URL-friendly slug from a category name. e.g., "Webring & Allies" -> "webring_and_allies"
function slugify(text) {
	return text
		.toLowerCase()
		.replace(/ & /g, '_and_')
		.replace(/[^a-z0-9\s_]/g, '')
		.trim()
		.replace(/\s+/g, '_');
}

// Extracts the parent directory part of a slug. e.g., "media-films" -> "media"; "software" -> "software"
function getParentSlug(slug) {
	return slug.includes('-') ? slug.split('-')[0] : slug;
}

/** @type {import('./$types').PageLoad} */
export async function load({ params, url, parent }) {
	const { archives } = await parent();
	const lookupSlug = url.searchParams.get('archive');
	const categorySlug = url.searchParams.get('category');

	// --- REDIRECTS for incomplete URLs ---

	// 1. If user navigates to the base `/data`, redirect to the very first archive and its first category.
	if (!params.archive) {
		const firstArchive = archives[0];
		if (!firstArchive) error(500, 'Data archives are missing');
		const parentSlug = getParentSlug(firstArchive.slug);
		const category = slugify(Object.keys(firstArchive.jsonData)[0]);
		redirect(307, `/data/${parentSlug}?archive=${firstArchive.slug}&category=${category}`);
	}

	// 2. If user navigates to a path like `/data/media` without a query param, find the first matching
	//    archive in that group (e.g. `media-films`) and redirect to it.
	if (!lookupSlug) {
		const firstMatchingArchive = archives.find((p) => getParentSlug(p.slug) === params.archive);
		if (!firstMatchingArchive) error(404, `No archives found in group "${params.archive}"`);
		const parentSlug = getParentSlug(firstMatchingArchive.slug);
		const category = slugify(Object.keys(firstMatchingArchive.jsonData)[0]);
		redirect(307, `/data/${parentSlug}?archive=${firstMatchingArchive.slug}&category=${category}`);
	}

	// --- DATA LOADING AND VALIDATION ---

	const selectedArchive = archives.find((a) => a.slug === lookupSlug);
	if (!selectedArchive) error(404, `Archive with slug '${lookupSlug}' not found`);

	const categoryNames = Object.keys(selectedArchive.jsonData);
	const activeCategoryName = categoryNames.find((name) => slugify(name) === categorySlug);

	// 3. If the category is missing or invalid in the URL, redirect to the first valid category for the current archive.
	if (!activeCategoryName) {
		const parentSlug = getParentSlug(selectedArchive.slug);
		const firstCategory = slugify(categoryNames[0]);
		redirect(307, `/data/${parentSlug}?archive=${selectedArchive.slug}&category=${firstCategory}`);
	}

	return {
		selectedArchive,
		activeCategoryName,
		slugify,
		getParentSlug
	};
}