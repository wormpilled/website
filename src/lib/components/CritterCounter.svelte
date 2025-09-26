<!-- /var/www/html/wormpilled/src/lib/components/CritterCounter.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	export let slug: string;

	let count = '----';
	// Make sure this URL matches your deployed Cloudflare Worker's URL.
	const apiUrl = 'https://api.wormpilled.workers.dev';

	onMount(async () => {
		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ slug: slug })
			});
			if (!response.ok) {
				throw new Error('API response not OK');
			}
			const data = await response.json();
			count = '0x' + data.hits.toString(16).toUpperCase().padStart(4, '0');
		} catch (error) {
			console.error('Critter counter API failed:', error);
			count = '0xDEAD';
		}
	});
</script>

<span>//ACCESSES: {count}</span>

<style>
	span {
		color: #888;
		font-size: 0.9em;
	}
</style>
