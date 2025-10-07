<!-- /var/www/html/wormpilled/src/lib/components/Blinkies.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import blinkies from '$lib/data/blinkies.json';
	import { getWidgetStyle } from '$lib/widgetStyler';

	let displayedBlinkies: typeof blinkies = [];
	const maxBlinkies = 8; // Max number of blinkies to show
	let styleString = '';

	// Function to shuffle an array
	function shuffle(array: any[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	onMount(() => {
		displayedBlinkies = shuffle([...blinkies]).slice(0, maxBlinkies);
		const theme = document.documentElement.getAttribute('data-theme') || 'wormpilled';
		styleString = getWidgetStyle('Blinkies', theme);
	});
</script>

<div class="widget" style={styleString}>
	<p class="title">//AFFILIATES</p>
	<div class="blinkie-container">
		{#each displayedBlinkies as blinkie}
			{#if blinkie.url}
				<a href={blinkie.url} target="_blank" rel="noopener noreferrer">
					<img src={blinkie.src} alt={blinkie.alt} />
				</a>
			{:else}
				<img src={blinkie.src} alt={blinkie.alt} />
			{/if}
		{/each}
	</div>
</div>

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
	.blinkie-container {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		justify-content: center;
		align-items: center;
	}
	.blinkie-container img,
	.blinkie-container a {
		border: none;
		display: block; /* Ensures anchor takes up space */
	}
	.blinkie-container a:hover {
		background-color: transparent; /* Override global hover style */
		outline: 1px solid var(--accent);
	}
</style>