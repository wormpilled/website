<!-- /var/www/html/wormpilled/src/lib/components/HexClock.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	let hexTime = '#--:--:--';

	function updateClock() {
		const now = new Date();
		const hours = now.getHours().toString(16).toUpperCase().padStart(2, '0');
		const minutes = now.getMinutes().toString(16).toUpperCase().padStart(2, '0');
		const seconds = now.getSeconds().toString(16).toUpperCase().padStart(2, '0');
		hexTime = `#${hours}:${minutes}:${seconds}`;
		requestAnimationFrame(updateClock);
	}

	onMount(() => {
		const animationFrame = requestAnimationFrame(updateClock);
		return () => cancelAnimationFrame(animationFrame);
	});
</script>

<div class="widget">
	<p class="title">//LOCAL_TIME</p>
	<p>{hexTime}</p>
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
