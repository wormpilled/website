<!-- /var/www/html/wormpilled/src/lib/components/GeographicSector.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { getWidgetStyle } from '$lib/widgetStyler';

	let styleString = '';

	onMount(() => {
		const theme = document.documentElement.getAttribute('data-theme') || 'wormpilled';
		styleString = getWidgetStyle('GeographicSector', theme);
	});
</script>

<div class="widget" style={styleString}>
	<p class="title">//GEO_POS</p>
	<p>SECTOR 404, MEGACITY_PRIME</p>
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
		color: var(--widget-paragraph-color);
	}
</style>