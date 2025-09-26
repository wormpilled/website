<!-- /var/www/html/wormpilled/src/lib/components/Shrine.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import shrines from '$lib/data/shrines.json';

	let randomShrine = shrines[0];

	onMount(() => {
		randomShrine = shrines[Math.floor(Math.random() * shrines.length)];
	});
</script>

<div class="widget">
	<p class="title">{randomShrine.title}</p>
	<pre>{randomShrine.art.join('\n')}</pre>
	<a href={randomShrine.url} target="_blank" rel="noopener noreferrer">{randomShrine.linkText}</a>
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
	pre {
		font-size: 0.8em;
		line-height: 1;
		margin-bottom: 0.5rem;
		text-align: center;
	}
</style>
