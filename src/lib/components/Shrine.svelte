<!-- /var/www/html/wormpilled/src/lib/components/Shrine.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import shrines from '$lib/data/shrines.json';
	import { getWidgetStyle } from '$lib/widgetStyler';

	let randomShrine = shrines[0];
	let styleString = '';

	onMount(() => {
		randomShrine = shrines[Math.floor(Math.random() * shrines.length)];
		const theme = document.documentElement.getAttribute('data-theme') || 'wormpilled';
		styleString = getWidgetStyle('Shrine', theme);
	});
</script>

<div class="widget" style={styleString}>
	<p class="title">{randomShrine.title}</p>
	<pre>{randomShrine.art.join('\n')}</pre>
	<a href={randomShrine.url} target="_blank" rel="noopener noreferrer">{randomShrine.linkText}</a>
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
	pre {
		font-size: 0.8em;
		line-height: 1;
		margin-bottom: 0.5rem;
		text-align: center;
		color: var(--widget-paragraph-color);
	}
</style>