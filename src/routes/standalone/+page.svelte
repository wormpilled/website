<!-- /var/www/html/wormpilled/src/routes/standalone/+page.svelte -->
<script lang="ts">
	import pages from '$lib/posts/standalone.json';
</script>

<svelte:head>
	<title>Standalone</title>
	<meta name="description" content="Index of evergreen, high-effort pages." />
</svelte:head>

<div>
	<h1>// Standalone Pages</h1>
	<p>A collection of evergreen, high-effort, or foundational documents.</p>
	{#each pages as page}
		<article>
			<h2><a href="/standalone/{page.slug}">{page.title}</a></h2>
			<div class="meta">
				<span>Last Updated: {new Date(page.date).toISOString().split('T')[0]}</span>
			</div>
			<p>{page.description}</p>
		</article>
	{/each}
</div>

<style>
	article {
		margin-bottom: 3rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}
	article:last-child {
		border-bottom: none;
	}
	h2 {
		margin-bottom: 0.5rem;
	}
	h2 a {
		color: var(--foreground);
	}
	.meta {
		color: #888;
		font-size: 0.9em;
		margin-bottom: 1rem;
		display: flex;
		gap: 1rem;
	}
</style>