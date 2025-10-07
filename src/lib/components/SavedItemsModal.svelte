<!-- /var/www/html/wormpilled/src/lib/components/SavedItemsModal.svelte -->
<script lang="ts">
	import { userData } from '$lib/stores';
	import { browser } from '$app/environment';

	function exportToJson() {
		if (!browser) return;
		const dataStr = JSON.stringify($userData.savedItems, null, 2);
		const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
		const exportFileDefaultName = 'wormpilled_saved_items.json';
		const linkElement = document.createElement('a');
		linkElement.setAttribute('href', dataUri);
		linkElement.setAttribute('download', exportFileDefaultName);
		linkElement.click();
	}

	function handleRemove(itemLink: string) {
		if (confirm('Are you sure you want to remove this item?')) {
			userData.removeSavedItem(itemLink);
		}
	}
</script>

<div class="saved-items-content">
	<div class="header">
		<h1>// SAVED_ITEMS</h1>
		<button on:click={exportToJson} disabled={$userData.savedItems.length === 0}
			>EXPORT_JSON</button
		>
	</div>

	{#if $userData.savedItems.length > 0}
		<div class="item-grid">
			{#each $userData.savedItems as item (item.link)}
				<div class="item-card">
					<a href={item.link} target="_blank" rel="noopener noreferrer">
						<strong class="item-name">{item.name}</strong>
					</a>
					<p class="item-description">{item.description}</p>
					<div class="card-actions">
						<button class="remove-button" on:click={() => handleRemove(item.link)}>REMOVE</button>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p>You have no saved items. Go to the <a href="/data">Data Archives</a> to save some.</p>
	{/if}
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.item-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
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
	.card-actions {
		margin-top: 0.5rem;
		text-align: right;
	}
	.remove-button {
		font-size: 0.8em;
		padding: 0.1em 0.4em;
	}
</style>