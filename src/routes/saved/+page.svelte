<!-- /var/www/html/wormpilled/src/routes/saved/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	let savedItems: any[] = [];
	let isMounted = false;

	onMount(() => {
		const stored = localStorage.getItem('savedDataItems');
		if (stored) {
			savedItems = JSON.parse(stored);
		}
		isMounted = true;
	});

	function removeItem(link: string) {
		savedItems = savedItems.filter((item) => item.link !== link);
		localStorage.setItem('savedDataItems', JSON.stringify(savedItems));
		window.dispatchEvent(new CustomEvent('uservitals:update'));
	}

	function clearAll() {
		if (confirm('Are you sure you want to clear all saved items?')) {
			savedItems = [];
			localStorage.removeItem('savedDataItems');
			window.dispatchEvent(new CustomEvent('uservitals:update'));
		}
	}

	function exportToJson() {
		const jsonString = JSON.stringify(savedItems, null, 2);
		const blob = new Blob([jsonString], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'wormpilled_saved_items.json';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
</script>

<svelte:head>
	<title>Saved Items</title>
	<meta name="description" content="Your personal list of saved data archive items." />
</svelte:head>

<h1>// PERSONAL_ARCHIVE</h1>

{#if isMounted}
	{#if savedItems.length > 0}
		<div class="controls">
			<button on:click={exportToJson}>Export to JSON</button>
			<button on:click={clearAll} class="danger">Clear All</button>
		</div>
		<div class="item-grid">
			{#each savedItems as item (item.link)}
				<div class="item-card">
					<a href={item.link} target="_blank" rel="noopener noreferrer">
						<strong class="item-name">{item.name}</strong>
					</a>
					<p class="item-description">{item.description}</p>
					<button class="remove-button" on:click={() => removeItem(item.link)}>Remove</button>
				</div>
			{/each}
		</div>
	{:else}
		<p>You have no saved items. Navigate to the <a href="/data">Data Archives</a> to add some.</p>
	{/if}
{:else}
	<p>Initializing...</p>
{/if}

<style>
	.controls {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		margin-bottom: 2rem;
	}
	.danger {
		border-color: #ff5555;
		color: #ff5555;
	}
	.danger:hover {
		background-color: #ff5555;
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
		display: flex;
		flex-direction: column;
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
	.remove-button {
		margin-top: 1rem;
		align-self: flex-end;
		font-size: 0.8em;
		padding: 0.1em 0.4em;
	}
</style>