<!-- /var/www/html/wormpilled/src/routes/data/[[archive]]/+page.svelte -->
<script lang="ts">
	import RawJsonModal from '$lib/components/RawJsonModal.svelte';
	import { onMount } from 'svelte';
	import { showTakeover } from '$lib/stores';

	/** @type {import('./$types').PageData} */
	export let data;

	$: ({ selectedArchive, activeCategoryName, slugify, getParentSlug } = data);

	let savedItemsLinks = new Set();
	let clickedLinks = new Set();

	function updateLocalState() {
		const storedSaved = localStorage.getItem('savedDataItems');
		if (storedSaved) {
			savedItemsLinks = new Set(JSON.parse(storedSaved).map((i: any) => i.link));
		} else {
			savedItemsLinks = new Set();
		}
		const storedClicked = localStorage.getItem('clickedDataLinks');
		if (storedClicked) {
			clickedLinks = new Set(JSON.parse(storedClicked));
		}
	}

	onMount(() => {
		updateLocalState();
		window.addEventListener('uservitals:update', updateLocalState);

		return () => {
			window.removeEventListener('uservitals:update', updateLocalState);
		};
	});

	function handleLinkClick(itemLink: string) {
		if (clickedLinks.has(itemLink)) {
			return; // Don't award EXP twice
		}

		// Update EXP
		let exp = parseInt(localStorage.getItem('userExp') || '0', 10);
		localStorage.setItem('userExp', (exp + 1).toString());

		// Update clicked links
		clickedLinks.add(itemLink);
		localStorage.setItem('clickedDataLinks', JSON.stringify(Array.from(clickedLinks)));

		// Dispatch update event
		window.dispatchEvent(new CustomEvent('uservitals:update'));
	}

	function handleSaveItem(item: any) {
		const stored = localStorage.getItem('savedDataItems');
		let saved = stored ? JSON.parse(stored) : [];

		if (!savedItemsLinks.has(item.link)) {
			saved.push(item);
			localStorage.setItem('savedDataItems', JSON.stringify(saved));
			savedItemsLinks = new Set(savedItemsLinks.add(item.link)); // Trigger reactivity
			window.dispatchEvent(new CustomEvent('uservitals:update'));
		}
	}

	function openRawJsonTakeover() {
		showTakeover(RawJsonModal, {
			title: selectedArchive.title,
			jsonData: selectedArchive.jsonData
		});
	}
</script>

<svelte:head>
	<title>Data Archives: {selectedArchive.title}</title>
	<meta name="description" content="A dashboard of structured data lists and bookmarks." />
</svelte:head>

{#if savedItemsLinks.size > 0}
	<a href="/data/saved" class="back-link">&lt;-- SAVED</a>
{/if}
<h1>// DATA_ARCHIVES</h1>

<div class="content-pane">
	<div class="title-header">
		<h2>// {selectedArchive.title.toUpperCase()}</h2>
		<button class="raw-button" on:click={openRawJsonTakeover}>[ RAW ]</button>
	</div>
	<div class="description">
		{@html selectedArchive.description}
	</div>

	<nav class="tabs">
		{#each Object.keys(selectedArchive.jsonData) as category}
			{@const parentSlug = getParentSlug(selectedArchive.slug)}
			<a
				href="/data/{parentSlug}?archive={selectedArchive.slug}&category={slugify(category)}"
				class:active={category === activeCategoryName}
				class="button-link"
				data-sveltekit-noscroll
			>
				{category}
			</a>
		{/each}
	</nav>

	<div class="item-grid">
		{#if activeCategoryName && selectedArchive.jsonData[activeCategoryName]}
			{#each selectedArchive.jsonData[activeCategoryName] as item}
				<div class="item-card">
					<a
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						on:click={() => handleLinkClick(item.link)}
					>
						<strong class="item-name">{item.name}</strong>
					</a>
					<p class="item-description">{item.description}</p>
					<div class="item-footer">
						<button
							class="save-button"
							on:click={() => handleSaveItem(item)}
							disabled={savedItemsLinks.has(item.link)}
						>
							{savedItemsLinks.has(item.link) ? '[SAVED]' : '[SAVE]'}
						</button>
					</div>
				</div>
			{/each}
		{:else}
			<p>No items in this category.</p>
		{/if}
	</div>
</div>

<style>
	.back-link {
		display: inline-block;
		margin-bottom: 1rem;
	}
	.content-pane h2 {
		margin-top: 0;
		border: none;
		padding: 0;
	}
	.title-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 1rem;
		border-bottom: 1px solid var(--border);
		padding-bottom: 0.5rem;
	}

	.raw-button {
		font-size: 0.9em;
		padding: 0.1em 0.4em;
		flex-shrink: 0;
	}
	.description {
		margin: 1rem 0 2rem 0;
		font-size: 1.1em;
		color: #ccc;
	}
	.description :global(p) {
		margin: 0;
	}

	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		border-bottom: 2px solid var(--border);
		margin-bottom: 1.5rem;
	}
	.tabs .button-link {
		border-bottom: 2px solid transparent;
		margin-bottom: -2px;
		border-radius: 0;
		padding: 0.5rem 1rem;
		border-top: none;
		border-left: none;
		border-right: none;
		color: var(--accent);
		border: 1px solid var(--border);
		background: transparent;
	}
	.tabs .button-link.active {
		border-color: var(--accent);
		color: var(--accent);
		background-color: transparent;
	}
	.tabs .button-link:hover {
		border-color: var(--accent-visited);
		background-color: var(--accent);
		color: var(--background);
		text-decoration: none;
	}
	.tabs .button-link.active:hover {
		color: var(--background);
	}

	.item-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}
	.item-card {
		border: 1px solid var(--border);
		padding: 1rem;
		transition: border-color 0.2s ease;
		display: flex;
		flex-direction: column;
	}

	.item-card:hover {
		border-color: var(--accent);
	}

	.item-name {
		font-size: 1.1em;
		color: var(--foreground);
	}
	.item-card a {
		font-weight: normal;
	}
	.item-card a:hover .item-name {
		background-color: var(--accent);
		color: var(--background);
		text-decoration: underline;
	}
	.item-description {
		margin: 0.4rem 0 0 0;
		color: #aaa;
		font-size: 0.9em;
		flex-grow: 1;
	}
	.item-footer {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
	}
	.save-button {
		font-size: 0.8em;
		padding: 0.1em 0.4em;
	}
	.save-button:disabled {
		color: #888;
		border-color: #888;
		background-color: transparent;
	}
	.save-button:disabled:hover {
		cursor: default;
	}
</style>