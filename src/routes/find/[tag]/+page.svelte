<!-- /var/www/html/wormpilled/src/routes/find/[tag]/+page.svelte -->
<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;
	const { tag } = data;
</script>

<svelte:head>
	<title>Tag: {tag.name}</title>
	<meta name="description" content={`Content tagged with "${tag.name}".`} />
</svelte:head>

<div class="post-list">
	<a href="/find" class="back-link">&lt;-- All Tags</a>
	<h1>// TAGGED: #{tag.name}</h1>
	<ul>
		{#each tag.content as item}
			<li>
				<a href={item.path} class="item-link">
					<span class="date">{new Date(item.date).toISOString().split('T')[0]}</span>
					<span class="title">{item.title}</span>
					<span class="type-badge">{item.type}</span>
				</a>
				<div class="description">
					{@html item.description}
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.back-link {
		display: inline-block;
		margin-bottom: 1rem;
	}
	.post-list ul {
		list-style: none;
		padding: 0;
	}
	.post-list li {
		margin-bottom: 0.8rem;
		border-bottom: 1px dashed var(--border);
		padding-bottom: 0.8rem;
	}
	.post-list li:last-child {
		border-bottom: none;
	}

	.item-link {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem 1rem;
		color: var(--foreground);
		font-weight: normal;
	}

	.item-link:hover {
		background-color: transparent;
	}

	.item-link .title {
		font-weight: bold;
		color: var(--accent);
		text-decoration: underline;
	}
	.item-link:hover .title {
		background-color: var(--accent);
		color: var(--background);
	}

	.date {
		color: #888;
		font-size: 0.9em;
		flex-shrink: 0;
	}
	.type-badge {
		font-size: 0.8em;
		background-color: var(--border);
		padding: 0.1em 0.4em;
		border-radius: 4px;
		color: var(--foreground);
		text-transform: uppercase;
	}
	.description {
		margin: 0.3rem 0 0 0;
		font-size: 0.9em;
		padding-left: 1rem; /* Indent description */
	}
	.description :global(p) {
		margin: 0;
	}
</style>
