<!-- /var/www/html/wormpilled/src/lib/components/Webring.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import webringData from '$lib/data/webring.json';
	import { getWidgetStyle } from '$lib/widgetStyler';

	const siteName = 'wormpilled';
	const currentIndex = webringData.findIndex((site) => site.name === siteName);

	let prevSite, nextSite, randomSite;
	let styleString = '';

	if (currentIndex !== -1) {
		prevSite = webringData[(currentIndex - 1 + webringData.length) % webringData.length];
		nextSite = webringData[(currentIndex + 1) % webringData.length];

		// Find a random site that isn't the current one
		let randomIndex;
		do {
			randomIndex = Math.floor(Math.random() * webringData.length);
		} while (webringData.length > 1 && randomIndex === currentIndex);
		randomSite = webringData[randomIndex];
	}

	onMount(() => {
		const theme = document.documentElement.getAttribute('data-theme') || 'wormpilled';
		styleString = getWidgetStyle('Webring', theme);
	});
</script>

<div class="widget" style={styleString}>
	<p class="title">//WEB-RING</p>
	{#if prevSite && nextSite && randomSite}
		<p>
			<a href={prevSite.url} title={prevSite.name}>[ PREV ]</a>
			<a href={randomSite.url} title={randomSite.name}>[ RANDOM ]</a>
			<a href={nextSite.url} title={nextSite.name}>[ NEXT ]</a>
		</p>
	{:else}
		<p>-- OFFLINE --</p>
	{/if}
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
	p {
		margin: 0;
		display: flex;
		justify-content: space-between;
		color: var(--widget-paragraph-color);
	}
</style>