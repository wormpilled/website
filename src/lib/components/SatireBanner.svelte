<!-- /var/www/html/wormpilled/src/lib/components/SatireBanner.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import banners from '$lib/data/satire_banners.json';

	let randomBanner = banners[0];

	onMount(() => {
		randomBanner = banners[Math.floor(Math.random() * banners.length)];
	});
</script>

<div class="widget">
	<p class="title">//SPONSOR</p>
	<div class="banner-container">
		{@html randomBanner.svg}
	</div>
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
	.banner-container {
		border: 1px solid var(--border);
		padding: 0.5rem;
	}
</style>
