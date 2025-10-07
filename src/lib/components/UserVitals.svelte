<!-- /var/www/html/wormpilled/src/lib/components/UserVitals.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { getWidgetStyle } from '$lib/widgetStyler';

	let exp = 0;
	let savedCount = 0;
	let isNewUser = true;
	let styleString = '';

	onMount(() => {
		const updateState = () => {
			const storedExp = localStorage.getItem('userExp');
			const storedSaved = localStorage.getItem('savedDataItems');

			exp = storedExp ? parseInt(storedExp, 10) : 0;
			savedCount = storedSaved ? JSON.parse(storedSaved).length : 0;
			isNewUser = exp === 0 && savedCount === 0;
		};

		updateState();
		window.addEventListener('uservitals:update', updateState);

		const theme = document.documentElement.getAttribute('data-theme') || 'wormpilled';
		styleString = getWidgetStyle('UserVitals', theme);

		return () => {
			window.removeEventListener('uservitals:update', updateState);
		};
	});
</script>

{#if isNewUser}
	<div class="widget" style={styleString}>
		<p class="title">//NODE_INTERACTION</p>
		<p class="help-text">
			This node rewards exploration. Accessing external links from <a href="/data">data archives</a> grants
			EXP. You can also save items for later review.
		</p>
	</div>
{:else}
	<div class="widget" style={styleString}>
		<div class="title-container">
			<p class="title">//USER_VITALS</p>
			<a href="/data/saved" class="view-button">[ VIEW ]</a>
		</div>
		<p>EXP: {exp}</p>
		<p>SAVED ITEMS: {savedCount}</p>
	</div>
{/if}

<style>
	.widget {
		margin-bottom: 1.5rem;
		background-color: var(--widget-background-color);
	}
	.title-container {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		border-bottom: var(--widget-title-border-bottom);
		margin-bottom: 0.5rem;
	}
	.title-container p.title {
		border: 0px;
		line-height: 0.4rem;
		padding-bottom: 0;
		margin-bottom: 0;
	}
	.title {
		padding-bottom: 0.3em;
		margin: 0 0 0.5rem 0;
		color: var(--widget-title-color);
	}
	.widget > .title {
		border-bottom: var(--widget-title-border-bottom);
	}
	.view-button {
		font-size: 0.8em;
		border: 1px solid var(--border);
		background-color: var(--border);
		color: white;
	}
	.view-button:hover {
		background-color: var(--accent);
	}
	p {
		margin: 0.3rem 0;
		color: var(--widget-paragraph-color);
	}
	.help-text {
		font-size: 0.9em;
		color: #ccc;
		line-height: 1.4;
	}
</style>