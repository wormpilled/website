<!-- /var/www/html/wormpilled/src/lib/components/IncidentCounter.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	// Hard-coded start date for the incident counter
	const incidentStartDate = new Date('2024-01-01T00:00:00Z');
	let displayTime = '----d --h --m --s';

	function formatTime(ms: number) {
		const totalSeconds = Math.floor(ms / 1000);
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		return `${String(days).padStart(4, ' ')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
	}

	function updateCounter() {
		const now = new Date();
		const diff = now.getTime() - incidentStartDate.getTime();
		displayTime = formatTime(diff);
		requestAnimationFrame(updateCounter);
	}

	onMount(() => {
		const animationFrame = requestAnimationFrame(updateCounter);
		return () => cancelAnimationFrame(animationFrame);
	});
</script>

<div class="widget">
	<p class="title">//INCIDENT_FREE_FOR</p>
	<p>{displayTime}</p>
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
