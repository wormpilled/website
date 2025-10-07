<!-- /var/www/html/wormpilled/src/routes/find/+page.svelte -->
<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	// --- Search Implementation ---
	import { onMount } from 'svelte';
	import allPosts from '$lib/posts/posts.json';
	import allStandalone from '$lib/posts/standalone.json';

	let searchResults: any[] = [];
	let searchTerm = '';
	let searchActive = false;
	let searchIndex: any[] = [];

	// Create a unified search index on component mount.
	onMount(() => {
		const publishedPosts = allPosts
			.filter((p) => p.draft === false)
			.map((p) => ({
				...p,
				type: 'post',
				path: `/post/${p.slug}`
			}));

		const standalonePages = allStandalone.map((p) => ({
			...p,
			type: 'standalone',
			path: `/standalone/${p.slug}`
		}));

		searchIndex = [...publishedPosts, ...standalonePages];
	});

	function performSearch() {
		if (!searchTerm.trim()) {
			searchResults = [];
			searchActive = false;
			return;
		}
		searchActive = true;
		const lowerCaseTerm = searchTerm.toLowerCase();

		searchResults = searchIndex.filter(
			(item) =>
				item.title.toLowerCase().includes(lowerCaseTerm) ||
				item.description.toLowerCase().includes(lowerCaseTerm) ||
				(item.htmlContent && item.htmlContent.toLowerCase().includes(lowerCaseTerm))
		);
	}

	$: performSearch(searchTerm);
</script>

<svelte:head>
	<title>Find</title>
	<meta name="description" content="Find content by tag or search." />
</svelte:head>

<h1>// FIND_CONTENT</h1>

<div class="search-container">
	<h2>// Search</h2>
	<input
		type="text"
		placeholder="Begin typing to search all transmissions and pages..."
		bind:value={searchTerm}
	/>
</div>

{#if searchActive}
	<div class="search-results">
		<h3>// Search Results ({searchResults.length})</h3>
		{#if searchResults.length > 0}
			<ul>
				{#each searchResults as item}
					<li>
						<a href={item.path}>
							<span class="title">{item.title}</span>
							<span class="type-badge">{item.type}</span>
						</a>
						<p class="description">{item.description}</p>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No results found for "{searchTerm}".</p>
		{/if}
	</div>
{/if}

<div class="tag-index" style:display={searchActive ? 'none' : 'block'}>
	<h2>// Browse by Tag</h2>
	<div class="tag-cloud">
		{#each data.tags as tag}
			<a href="/find/{tag.slug}"> #{tag.name} ({tag.count}) </a>
		{/each}
	</div>
</div>

<style>
	.search-container {
		margin-bottom: 3rem;
	}
	.search-container input {
		width: 100%;
		padding: 0.5rem;
		font-size: 1.1em;
		background-color: var(--background);
		border: 1px solid var(--border);
		color: var(--foreground);
	}
	.search-container input:focus {
		outline: 1px solid var(--accent);
		border-color: var(--accent);
	}

	.search-results {
		margin-bottom: 3rem;
	}
	.search-results ul {
		list-style: none;
		padding: 0;
	}
	.search-results li {
		margin-bottom: 0.8rem;
		border-bottom: 1px dashed var(--border);
		padding-bottom: 0.8rem;
	}
	.search-results a {
		display: flex;
		gap: 1rem;
		align-items: baseline;
		font-weight: normal;
	}
	.search-results .title {
		color: var(--accent);
		font-weight: bold;
		text-decoration: underline;
	}
	.search-results a:hover .title {
		background-color: var(--accent);
		color: var(--background);
	}
	.search-results .type-badge {
		font-size: 0.8em;
		background-color: var(--border);
		padding: 0.1em 0.4em;
		border-radius: 4px;
		text-transform: uppercase;
	}
	.search-results .description {
		font-size: 0.9em;
		margin-top: 0.2rem;
		padding-left: 1rem;
	}

	.tag-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		align-items: baseline;
		border: 1px solid var(--border);
		padding: 1.5rem;
	}

	.tag-cloud a {
		font-size: 1.1em;
		font-weight: normal;
		border: 1px solid var(--border);
		padding: 0.2em 0.6em;
		white-space: nowrap;
	}

	.tag-cloud a:hover {
		border-color: var(--accent);
	}
</style>