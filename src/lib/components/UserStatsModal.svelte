<!-- /var/www/html/wormpilled/src/lib/components/UserStatsModal.svelte -->
<script lang="ts">
	import { userData } from '$lib/stores';
</script>

<div class="stats-content">
	<h1>// USER_STATS</h1>
	<div class="stat-item">
		<span class="stat-label">// EXPERIENCE_POINTS</span>
		<span class="stat-value">{$userData.exp} EXP</span>
	</div>
	<p class="explanation">
		You gain 1 EXP every time you click an external link from the Data Archives. This metric is
		stored locally on your device and is not sent anywhere.
	</p>
</div>

<style>
	.stats-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.stat-item {
		border: 1px solid var(--border);
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		flex-wrap: wrap;
	}
	.stat-label {
		color: var(--accent);
		font-weight: bold;
	}
	.stat-value {
		font-size: 1.5em;
		font-weight: bold;
	}
	.explanation {
		font-size: 0.9em;
		color: #aaa;
		margin-top: 1rem;
	}
</style>