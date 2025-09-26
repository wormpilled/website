import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// --- Configuration ---
const POSTS_DIR = '/home/user/Obsidian/wormpilled/POSTS';
const UPLOADS_DIR = '/home/user/Obsidian/wormpilled/UPLOADS';
const OUTPUT_JSON_DIR = path.resolve(process.cwd(), 'src/lib/posts');
const STATIC_UPLOADS_DIR = path.resolve(process.cwd(), 'static/UPLOADS');

// --- Helper Functions ---

function findMarkdownFiles(dir) {
	let markdownFiles = [];
	if (!fs.existsSync(dir)) {
		console.warn(`Content directory not found: ${dir}. Skipping post generation.`);
		return markdownFiles;
	}
	const files = fs.readdirSync(dir);
	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			markdownFiles = markdownFiles.concat(findMarkdownFiles(filePath));
		} else if (path.extname(file) === '.md') {
			markdownFiles.push(filePath);
		}
	}
	return markdownFiles;
}

function ensureDirectoryExists(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

// --- Main Execution ---

console.log('--- Starting Content Build ---');

// 1. Ensure output directories exist
ensureDirectoryExists(OUTPUT_JSON_DIR);
ensureDirectoryExists(STATIC_UPLOADS_DIR);

// 2. Copy asset files
if (fs.existsSync(UPLOADS_DIR)) {
	const assets = fs.readdirSync(UPLOADS_DIR);
	console.log(`Found ${assets.length} assets in ${UPLOADS_DIR}. Syncing to static folder...`);
	assets.forEach(file => {
		const srcFile = path.join(UPLOADS_DIR, file);
		const destFile = path.join(STATIC_UPLOADS_DIR, file);
		fs.copyFileSync(srcFile, destFile);
	});
} else {
	console.warn(`[Assets] Uploads directory not found: ${UPLOADS_DIR}. No assets copied.`);
}

// 3. Process Markdown posts
const allPosts = [];
const markdownFiles = findMarkdownFiles(POSTS_DIR);
console.log(`[Posts] Found ${markdownFiles.length} markdown files to process...`);

for (const filePath of markdownFiles) {
	console.log(` -> Processing: ${path.basename(filePath)}`);
	const fileContent = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(fileContent);

	// A post is a draft ONLY if 'draft: true' is in the frontmatter.
	// If 'draft' is false, undefined, or null, the post will be published.
	if (data.draft === true) {
		console.log(`    - SKIPPING: Post is marked as a draft.`);
		continue;
	}

	const processedContent = content.replace(/!\[\[(UPLOADS\/.*?)\]\]/g, '![](/$1)');
	const htmlContent = marked(processedContent);
	const slug = path.basename(filePath, '.md').toLowerCase().replace(/\s+/g, '-');

	allPosts.push({
		slug,
		htmlContent,
		...data,
	});
}

// 4. Sort posts by date (newest first)
allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

// 5. Write the final JSON output
fs.writeFileSync(
	path.join(OUTPUT_JSON_DIR, 'posts.json'),
	JSON.stringify(allPosts, null, 2)
);

if (allPosts.length === 0) {
	console.warn('[Posts] No publishable posts were found. Wrote an empty posts.json.');
} else {
	console.log(`[Posts] Successfully processed and wrote ${allPosts.length} posts to src/lib/posts/posts.json.`);
}

console.log('--- Content Build Finished ---');