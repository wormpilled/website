<!-- /var/www/html/wormpilled/src/lib/components/Webring.svelte -->
<script lang="ts">
	import webringData from '$lib/data/webring.json';

	const siteName = 'wormpilled';
	const currentIndex = webringData.findIndex((site) => site.name === siteName);

	let prevSite, nextSite, randomSite;

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
</script>

<div class="widget">
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
	}
	.title {
		border-bottom: 1px solid var(--border);
		padding-bottom: 0.3em;
		margin-bottom: 0.5rem;
		color: var(--accent);
	}
	p {
		margin: 0;
		display: flex;
		justify-content: space-between;
	}
</style>
