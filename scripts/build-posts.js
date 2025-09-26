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

const OUTPUT_DIR = path.join(process.cwd(), 'src/lib/posts');
const STATIC_DIR = path.join(process.cwd(), 'static');

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

function processDirectory(dirPath, extractHeaders = false) {
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
			const slug = getSlug(slugBase);

			const processedContent = content.replace(/!\[\[UPLOADS\/(.*?)]]/g, (match, imageName) => {
				const encodedImageName = imageName.replace(/\s/g, '%20');
				return `![${imageName}](/${encodedImageName})`;
			});

			let htmlContent = marked.parse(processedContent);
			let headers = [];

			if (extractHeaders) {
				const $ = cheerio.load(htmlContent);
				const headerElements = $('h1, h2, h3');
				
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
				headers
			};
		})
		.filter(Boolean);

	if (allData.length > 0) {
		allData.sort((a, b) => new Date(b.date) - new Date(a.date));
	}
	return allData;
}

console.log('Starting content build process...');

const postsData = processDirectory(POSTS_DIR, false);
fs.writeFileSync(path.join(OUTPUT_DIR, 'posts.json'), JSON.stringify(postsData, null, 2));
console.log(`\nProcessed ${postsData.length} total posts.`);

const standaloneData = processDirectory(STANDALONE_DIR, true);
fs.writeFileSync(path.join(OUTPUT_DIR, 'standalone.json'), JSON.stringify(standaloneData, null, 2));
console.log(`Processed ${standaloneData.length} total standalone pages.`);

if (fs.existsSync(UPLOADS_DIR)) {
	const staticUploadsDir = path.join(STATIC_DIR, 'UPLOADS');
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