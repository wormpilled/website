import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import * as cheerio from 'cheerio';

const OBSIDIAN_VAULT_PATH = '/home/user/Obsidian/wormpilled';
const POSTS_DIR = path.join(OBSIDIAN_VAULT_PATH, 'POSTS');
const STANDALONE_DIR = path.join(OBSIDIAN_VAULT_PATH, 'STANDALONE');
const UPLOADS_DIR = path.join(OBSIDIAN_VAULT_PATH, 'UPLOADS');

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
	const items = fs.readdirSync(dir);
	for (const item of items) {
		const fullPath = path.join(dir, item);
		if (fs.statSync(fullPath).isDirectory()) {
			files = files.concat(getMarkdownFiles(fullPath));
		} else if (path.extname(item) === '.md') {
			files.push(fullPath);
		}
	}
	return files;
}

function processDirectory(dirPath, extractHeaders = false) {
	if (!fs.existsSync(dirPath)) {
		console.warn(`Directory not found: ${dirPath}. Skipping.`);
		return [];
	}

	const files = getMarkdownFiles(dirPath);
	console.log(`\nFound ${files.length} files in ${path.basename(dirPath)}...`);

	const allData = files
		.map((file) => {
			const relativePath = path.relative(OBSIDIAN_VAULT_PATH, file);
			console.log(`- Processing: ${relativePath}`);
			const fileContent = fs.readFileSync(file, 'utf8');
			const { data, content } = matter(fileContent);

			if (data.draft) {
				console.log(`  ... SKIPPING DRAFT.`);
				return null;
			}

			const slug = getSlug(path.relative(dirPath, file).replace(/\.md$/, ''));

			const processedContent = content.replace(/!\[\[UPLOADS\/(.*?)]]/g, (match, imageName) => {
				const encodedImageName = imageName.replace(/\s/g, '%20');
				return `![${imageName}](/${encodedImageName})`;
			});

			let htmlContent = marked.parse(processedContent);
			let headers = [];

			if (extractHeaders) {
				const $ = cheerio.load(htmlContent);
				const headerElements = $('h1, h2, h3');
				console.log(`  ... found ${headerElements.length} headers in "${relativePath}"`);

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
				console.log(`  ... extracted headers: ${JSON.stringify(headers.map(h => h.text))}`);
			}

			return {
				...data,
				slug,
				htmlContent,
				headers
			};
		})
		.filter(Boolean);

	allData.sort((a, b) => new Date(b.date) - new Date(a.date));
	return allData;
}

const postsData = processDirectory(POSTS_DIR, false);
fs.writeFileSync(path.join(OUTPUT_DIR, 'posts.json'), JSON.stringify(postsData, null, 2));
console.log(`\nProcessed ${postsData.length} total posts.`);

const standaloneData = processDirectory(STANDALONE_DIR, true);
fs.writeFileSync(path.join(OUTPUT_DIR, 'standalone.json'), JSON.stringify(standaloneData, null, 2));
console.log(`Processed ${standaloneData.length} total standalone pages.`);

if (fs.existsSync(UPLOADS_DIR)) {
	console.log(`\nCopying uploads from ${UPLOADS_DIR} to ${STATIC_DIR}...`);
	if (!fs.existsSync(STATIC_DIR)) {
		fs.mkdirSync(STATIC_DIR, { recursive: true });
	}
	fs.cpSync(UPLOADS_DIR, STATIC_DIR, { recursive: true });
	console.log('Uploads copied successfully.');
} else {
	console.warn(`\nUploads directory not found: ${UPLOADS_DIR}. Skipping copy.`);
}
