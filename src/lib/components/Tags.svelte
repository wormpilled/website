<!-- /var/www/html/wormpilled/src/lib/components/Tags.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { getWidgetStyle } from '$lib/widgetStyler';

	export let tags: string[] | undefined = [];
	let styleString = '';

	onMount(() => {
		const theme = document.documentElement.getAttribute('data-theme') || 'wormpilled';
		styleString = getWidgetStyle('Tags', theme);
	});

	function getTagSlug(tag: string) {
		// Replicating the slug logic from build script
		return tag
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.trim()
			.replace(/\s+/g, '-');
	}
</script>

{#if tags && tags.length > 0}
	<div class="widget" style={styleString}>
		<p class="title">// TAGS</p>
		<div class="tag-list">
			{#each tags as tag}
				<a class="tag" href="/find/{getTagSlug(tag)}">#{tag}</a>
			{/each}
		</div>
	</div>
{/if}

<style>
	.widget {
		margin-bottom: 1.5rem;
		background-color: var(--widget-background-color);
	}
	.title {
		border-bottom: var(--widget-title-border-bottom);
		padding-bottom: 0.3em;
		margin-bottom: 0.5rem;
		color: var(--widget-title-color);
	}
	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem 0.5rem;
	}
	.tag {
		background-color: var(--border);
		padding: 0.1em 0.4em;
		border-radius: 4px;
		color: var(--accent);
		font-size: 0.9em;
		font-weight: normal; /* override default bold link */
	}

	.tag:hover {
		background-color: var(--accent);
		color: var(--background);
		text-decoration: none;
	}
</style>