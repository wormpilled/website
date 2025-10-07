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
	<ul class="page-list">
		{#each pages as page}
			<li>
				<a href="/standalone/{page.slug}">
					<span class="title">{page.title}</span>
					<span class="date">
						(Updated: {new Date(page.date).toISOString().split('T')[0]})
					</span>
				</a>
				<p class="description">{page.description}</p>
			</li>
		{/each}
	</ul>
</div>

<style>
	.page-list {
		list-style: ':: ';
		padding-left: 1.5rem;
		margin-top: 2rem;
	}
	.page-list li {
		margin-bottom: 1rem;
	}

	.page-list a {
		font-weight: normal;
		color: var(--foreground);
	}

	.page-list a .title {
		font-weight: bold;
		color: var(--accent);
		font-size: 1.1em;
		text-decoration: underline;
	}

	.page-list a:hover .title {
		background-color: var(--accent);
		color: var(--background);
	}

	.date {
		font-size: 0.8em;
		color: #888;
		margin-left: 0.5rem;
	}
	.description {
		font-size: 0.9em;
		margin: 0.2rem 0 0 0;
	}
</style>