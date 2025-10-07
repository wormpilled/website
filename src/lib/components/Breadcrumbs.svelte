<!-- /var/www/html/wormpilled/src/lib/components/Breadcrumbs.svelte -->
<script lang="ts">
	import { page } from '$app/stores';

	$: segments = $page.url.pathname
		.split('/')
		.filter(Boolean)
		.map((segment, i, arr) => {
			const segmentsForPath = arr.slice(0, i + 1);
			let path = '/' + segmentsForPath.join('/');
			let name = segment;

			// The only special case is the top-level 'post' segment, which should link to and display as '/posts'.
			if (segmentsForPath.length === 1 && segmentsForPath[0] === 'post') {
				path = '/posts';
				name = 'posts';
			}

			return {
				name,
				path: path
			};
		});
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
	<span class="prompt">wormpilled@node:</span>
	<a href="/" class="path">~</a>
	{#each segments as segment, i}
		<span class="separator">/</span>
		{#if i < segments.length - 1}
			<a href={segment.path} class="path">{segment.name}</a>
		{:else}
			<span class="current-page" aria-current="page">{segment.name}</span>
		{/if}
	{/each}
	<span class="cursor" />
</nav>

<style>
	.breadcrumbs {
		font-family: 'SF Mono', 'Consolas', 'Menlo', monospace; 
		word-break: break-all;
		background-color: var(--background);
		border: 1px solid var(--border);
		padding: 0.5em 2em;
		display: inline-flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.breadcrumbs a,
	.breadcrumbs span {
		font-weight: normal;
	}

	.prompt {
		color: var(--accent);
		margin-right: 0.3em;
	}

	.path {
		color: #87cefa; /* Light sky blue */
	}
	.path:hover {
		background-color: #87cefa;
		color: var(--background);
		text-decoration: none;
	}
	.path:visited {
		color: #6495ed; /* Cornflower blue */
	}

	.separator {
		color: var(--foreground);
		margin: 0 0.1em;
	}

	.current-page {
		color: var(--foreground);
		font-weight: bold;
	}

	.cursor {
		display: inline-block;
		width: 9px;
		height: 1.1em;
		background-color: var(--foreground);
		margin-left: 5px;
		vertical-align: text-bottom;
		animation: blink 1.2s steps(1) infinite;
	}

	@keyframes blink {
		50% {
			background-color: transparent;
		}
	}
</style>
