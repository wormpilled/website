// /var/www/html/wormpilled/scripts/build-posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import * as cheerio from 'cheerio';

const CONTENT_PATH = path.join(process.cwd(), 'content');
const POSTS_DIR = path.join(CONTENT_PATH, 'POSTS');
const STANDALONE_DIR = path.join(CONTENT_PATH, 'STANDALONE');
const UPLOADS_DIR = path.join(CONTENT_PATH, 'UPLOADS');
const DATA_CONTENT_DIR = path.join(CONTENT_PATH, 'DATA');

const OUTPUT_DIR = path.join(process.cwd(), 'src/lib/posts');
const DATA_DIR = path.join(process.cwd(), 'src/lib/data');
const AUTHORS_DIR = path.join(DATA_DIR, 'authors');

if (!fs.existsSync(OUTPUT_DIR)) {
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getSlug(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

function loadAuthors() {
	const authors = {};
	if (!fs.existsSync(AUTHORS_DIR)) {
		console.warn(`\nWarning: Authors directory not found: ${AUTHORS_DIR}. Using default author.`);
		authors['wormpilled'] = {
			name: 'wormpilled',
			slug: 'wormpilled',
			avatar: '/assets/avatar/wormpilled.gif',
			shortBio: 'A local-first brutalist entity.'
		};
		return authors;
	}
	const authorFiles = fs.readdirSync(AUTHORS_DIR).filter((file) => file.endsWith('.json'));
	for (const file of authorFiles) {
		const authorSlug = path.basename(file, '.json');
		try {
			const authorData = JSON.parse(fs.readFileSync(path.join(AUTHORS_DIR, file), 'utf8'));
			authorData.slug = authorSlug; // Inject the slug into the author object
			authors[authorSlug.toLowerCase()] = authorData;
		} catch (error) {
			console.error(`\nError parsing author file ${file}:`, error);
		}
	}
	// Write a consolidated authors file for easy lookup in the app
	fs.writeFileSync(path.join(DATA_DIR, 'authors.json'), JSON.stringify(authors, null, 2));
	console.log(`\nLoaded ${Object.keys(authors).length} authors and created authors.json.`);
	return authors;
}

function getMarkdownFiles(dir) {
	let files = [];
	try {
		const items = fs.readdirSync(dir);
		for (const item of items) {
			const fullPath = path.join(dir, item);
			if (fs.statSync(fullPath).isDirectory()) {
				files = files.concat(getMarkdownFiles(fullPath));
			} else if (path.extname(item) === '.md') {
				files.push(fullPath);
			}
		}
	} catch (error) {
		console.warn(`\nWarning: Could not read directory ${dir}. It might not exist. Skipping.`);
		return [];
	}
	return files;
}

function processDirectory(dirPath, extractHeaders = false, authors) {
	if (!fs.existsSync(dirPath)) {
		console.warn(`Directory not found: ${dirPath}. Skipping.`);
		return [];
	}

	const files = getMarkdownFiles(dirPath);
	if (files.length > 0) {
		console.log(`\nFound ${files.length} files in ${path.basename(dirPath)}...`);
	}

	const allData = files
		.map((file) => {
			const relativePath = path.relative(CONTENT_PATH, file);
			console.log(`- Processing: ${relativePath}`);
			const fileContent = fs.readFileSync(file, 'utf8');
			const { data, content } = matter(fileContent);

			if (data.draft) {
				console.log(`  ... SKIPPING DRAFT.`);
				return null;
			}

			const slugBase = path.relative(dirPath, file).replace(/\.md$/, '');
			// Flatten subdirectories into the slug with a hyphen
			const slug = getSlug(slugBase.replace(/\\|\//g, '-'));

			const authorSlug = data.author
				? getSlug(data.author)
				: data.aliases && Array.isArray(data.aliases) && data.aliases.length > 0
					? getSlug(data.aliases[0])
					: 'wormpilled';

			const authorInfo = authors[authorSlug.toLowerCase()] || authors['wormpilled'];

			const processedContent = content.replace(/!\[\[UPLOADS\/(.*?)]]/g, (match, imageName) => {
				const encodedImageName = imageName.replace(/\s/g, '%20');
				return `![${imageName}](/${encodedImageName})`;
			});

			let htmlContent = marked.parse(processedContent);
			let headers = [];

			if (extractHeaders) {
				const $ = cheerio.load(htmlContent);
				const headerElements = $('h1, h2, h3, h4, h5, h6');

				if (headerElements.length > 0) {
					headerElements.each(function () {
						const element = $(this);
						const text = element.text();
						const id = getSlug(text);
						element.attr('id', id);
						headers.push({
							level: parseInt(this.tagName.substring(1)),
							text,
							id
						});
					});
					htmlContent = $('body').html();
				}
			}

			return {
				...data,
				slug,
				htmlContent,
				headers,
				author: authorInfo
			};
		})
		.filter(Boolean);

	if (allData.length > 0) {
		// Sort oldest to newest for chronological navigation
		allData.sort((a, b) => new Date(a.date) - new Date(b.date));
	}
	return allData;
}

function processDataDirectory(dirPath) {
	if (!fs.existsSync(dirPath)) {
		console.warn(`Data directory not found: ${dirPath}. Skipping.`);
		return [];
	}
	const files = getMarkdownFiles(dirPath);
	if (files.length > 0) {
		console.log(`\nFound ${files.length} data files in ${path.basename(dirPath)}...`);
	}

	const allData = files
		.map((file) => {
			const relativePath = path.relative(CONTENT_PATH, file);
			console.log(`- Processing Data File: ${relativePath}`);
			const fileContent = fs.readFileSync(file, 'utf8');
			const { data, content } = matter(fileContent);

			// --- Robust JSON parsing logic ---
			const startTag = '```json';
			const endTag = '```';
			const lowerContent = content.toLowerCase();

			const startIndex = lowerContent.indexOf(startTag);
			if (startIndex === -1) {
				console.warn(`  ... SKIPPING: No JSON start tag found in ${relativePath}.`);
				return null;
			}

			// Find the end tag *after* the start tag
			const endIndex = lowerContent.indexOf(endTag, startIndex + startTag.length);
			if (endIndex === -1) {
				console.warn(`  ... SKIPPING: No JSON end tag found in ${relativePath}.`);
				return null;
			}

			// Extract the JSON content from the original content string to preserve case
			const jsonContent = content.substring(startIndex + startTag.length, endIndex).trim();

			let jsonData;
			if (jsonContent === '') {
				jsonData = {};
			} else {
				try {
					jsonData = JSON.parse(jsonContent);
				} catch (e) {
					console.error(
						`  ... SKIPPING: Invalid JSON in ${relativePath}. Error: ${e.message}`
					);
					return null;
				}
			}

			// Reconstruct the full code block to remove it and get the body content
			const fullCodeBlock = content.substring(startIndex, endIndex + endTag.length);
			const bodyContentMd = content.replace(fullCodeBlock, '').trim();
			// --- End robust parsing ---

			let combinedDescription = data.description || '';
			if (bodyContentMd) {
				combinedDescription += (combinedDescription ? '\n\n' : '') + bodyContentMd;
			}
			const descriptionHtml = marked.parse(combinedDescription);

			const slugBase = path.relative(dirPath, file).replace(/\.md$/, '');
			const slug = getSlug(slugBase.replace(/\\|\//g, '-'));
			const title =
				data.title ||
				path
					.basename(file, '.md')
					.replace(/([A-Z])/g, ' $1')
					.trim();

			return {
				slug,
				title,
				description: descriptionHtml,
				jsonData
			};
		})
		.filter(Boolean);

	// Sort alphabetically by title for consistent ordering
	allData.sort((a, b) => a.title.localeCompare(b.title));

	return allData;
}

console.log('Starting content build process...');

const authors = loadAuthors();

// Process posts chronologically, now with header extraction
const postsData = processDirectory(POSTS_DIR, true, authors);

// Create navigation map using the chronological order
const postNavigationMap = {};
postsData.forEach((post, index) => {
	const prevPost = index > 0 ? postsData[index - 1] : null;
	const nextPost = index < postsData.length - 1 ? postsData[index + 1] : null;

	postNavigationMap[post.slug] = {
		prev: prevPost
			? { slug: prevPost.slug, title: prevPost.title }
			: { slug: '/posts', title: 'Back to All Transmissions' },
		next: nextPost
			? { slug: nextPost.slug, title: nextPost.title }
			: { slug: '/standalone', title: 'View Standalone Pages' }
	};
});

fs.writeFileSync(path.join(OUTPUT_DIR, 'post-map.json'), JSON.stringify(postNavigationMap, null, 2));
console.log(`Created post navigation map.`);

// Now, reverse the sort for the main posts list to show newest first
const displayPostsData = [...postsData].sort((a, b) => new Date(b.date) - new Date(a.date));
fs.writeFileSync(path.join(OUTPUT_DIR, 'posts.json'), JSON.stringify(displayPostsData, null, 2));
console.log(`\nProcessed ${postsData.length} total posts (sorted newest to oldest for display).`);

const standaloneData = processDirectory(STANDALONE_DIR, true, authors);
fs.writeFileSync(path.join(OUTPUT_DIR, 'standalone.json'), JSON.stringify(standaloneData, null, 2));
console.log(`Processed ${standaloneData.length} total standalone pages.`);

const dataPagesData = processDataDirectory(DATA_CONTENT_DIR);
if (dataPagesData.length > 0) {
	fs.writeFileSync(path.join(OUTPUT_DIR, 'data.json'), JSON.stringify(dataPagesData, null, 2));
	console.log(`Processed ${dataPagesData.length} total data pages.`);
}

console.log('\nGenerating tag index...');
const allContent = [
	...postsData.map((p) => ({ ...p, type: 'post', path: `/post/${p.slug}` })),
	...standaloneData.map((p) => ({ ...p, type: 'standalone', path: `/standalone/${p.slug}` }))
];

const tagMap = {};

allContent.forEach((item) => {
	if (item.tags && Array.isArray(item.tags)) {
		item.tags.forEach((tag) => {
			const tagSlug = getSlug(tag);
			if (!tagMap[tagSlug]) {
				tagMap[tagSlug] = {
					name: tag,
					content: []
				};
			}
			tagMap[tagSlug].content.push({
				title: item.title,
				slug: item.slug,
				path: item.path,
				date: item.date,
				description: item.description || '',
				type: item.type
			});
		});
	}
});

// Sort content within each tag by date (newest first) for display
for (const tag in tagMap) {
	tagMap[tag].content.sort((a, b) => new Date(b.date) - new Date(a.date));
}

fs.writeFileSync(path.join(DATA_DIR, 'tags.json'), JSON.stringify(tagMap, null, 2));
console.log(`Created tag map with ${Object.keys(tagMap).length} unique tags.`);

if (fs.existsSync(UPLOADS_DIR)) {
	const staticUploadsDir = path.join(process.cwd(), 'static/UPLOADS');
	console.log(`\nCopying uploads from ${UPLOADS_DIR} to ${staticUploadsDir}...`);
	if (!fs.existsSync(staticUploadsDir)) {
		fs.mkdirSync(staticUploadsDir, { recursive: true });
	}
	fs.cpSync(UPLOADS_DIR, staticUploadsDir, { recursive: true, force: true });
	console.log('Uploads copied successfully.');
} else {
	console.warn(`\nUploads directory not found: ${UPLOADS_DIR}. Skipping copy.`);
}

console.log('\nContent build process finished.');