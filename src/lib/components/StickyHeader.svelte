<!-- /var/www/html/wormpilled/src/lib/components/StickyHeader.svelte -->
<script lang="ts">
	import ConfigModal from '$lib/components/ConfigModal.svelte';
	import PlanViewer from '$lib/components/PlanViewer.svelte';
	import navButtons from '$lib/data/dynamic_nav_buttons.json';
	import { showTakeover } from '$lib/stores';

	export let pageData: any;

	let planContent = 'Loading...';

	async function fetchPlan() {
		try {
			const response = await fetch('/plan.txt');
			if (response.ok) {
				planContent = await response.text();
			} else {
				planContent = 'Error: Could not load plan file.';
			}
		} catch (error) {
			planContent = 'Error: Could not fetch plan file.';
		}
	}

	function handleButtonClick(action?: string) {
		if (action === 'open_plan_modal') {
			fetchPlan().then(() => {
				showTakeover(PlanViewer, { content: planContent });
			});
		} else if (action === 'open_config_modal') {
			showTakeover(ConfigModal);
		}
	}
</script>

<div class="sticky-header">
	<a href="/" class="logo-link" aria-label="Back to Homepage">
		<svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet">
			<rect x="10" y="12.5" width="15" height="15" fill="var(--accent)" />
			<text
				x="35"
				y="22"
				dominant-baseline="middle"
				font-size="24"
				fill="var(--accent)"
				font-family="monospace">[W::P]</text
			>
		</svg>
	</a>

	{#if pageData}
		<div class="context-bar">
			{#if pageData.author}
				<img
					src={pageData.author.avatar}
					alt={pageData.author.name}
					class="context-avatar"
				/>
			{/if}
			<div class="context-text">
				<span class="context-title">{pageData.title}</span>
				<span class="context-date">({new Date(pageData.date).toISOString().split('T')[0]})</span>
			</div>
		</div>
	{/if}

	<nav class="nav-simple">
		{#each navButtons.filter((b) => b.showInSimpleNav) as buttonConfig}
			{#if buttonConfig.type === 'link'}
				<a
					href={buttonConfig.url}
					target={buttonConfig.isExternal ? '_blank' : undefined}
					rel={buttonConfig.isExternal ? 'noopener noreferrer' : undefined}
				>
					[{buttonConfig.text}]
				</a>
			{:else if buttonConfig.type === 'button'}
				<button on:click={() => handleButtonClick(buttonConfig.action)}>[{buttonConfig.text}]</button>
			{/if}
		{/each}
	</nav>
</div>

<style>
	.sticky-header {
		position: sticky;
		top: -1px; /* Prevents jiggle on some browsers */
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		background-color: var(--background);
		border-bottom: 1px solid var(--border);
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
		height: 40px;
		padding: 0 1rem;
		margin: 0 -2rem; /* Counteract parent padding */
	}

	.logo-link svg {
		height: 30px;
		min-width: 80px;
	}

	.context-bar {
		flex-grow: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		overflow: hidden;
		white-space: nowrap;
	}

	.context-avatar {
		height: 25px;
		width: 25px;
		border-radius: 50%;
		border: 1px solid var(--border);
	}
	.context-text {
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.context-title {
		font-weight: bold;
	}
	.context-date {
		font-size: 0.8em;
		color: #888;
		margin-left: 0.5rem;
	}

	.nav-simple {
		display: flex;
		gap: 4px;
	}

	.nav-simple a,
	.nav-simple button {
		font-family: 'SF Mono', 'Consolas', 'Menlo', monospace;
		color: var(--accent);
		background: none;
		border: none;
		padding: 0.2rem 0.4rem;
		font-size: 0.9rem;
		text-transform: uppercase;
		font-weight: bold;
	}

	.nav-simple a:hover,
	.nav-simple button:hover {
		background-color: var(--accent);
		color: var(--background);
		text-decoration: none;
	}
</style>