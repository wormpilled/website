<!-- /var/www/html/wormpilled/src/lib/components/SystemLoad.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	let load = '[--%] [--%] [--%]';
	onMount(() => {
		const load1 = Math.floor(Math.random() * 100);
		const load2 = Math.floor(Math.random() * 100);
		const load3 = Math.floor(Math.random() * 100);
		load = `[${load1}%] [${load2}%] [${load3}%]`;
	});
</script>

<div class="widget">
	<p class="title">//CORE_LOAD</p>
	<p>{load}</p>
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
	}
</style>
