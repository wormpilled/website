<script lang="ts">
	import posts from '$lib/posts/posts.json';
</script>

<svelte:head>
	<title>wormpilled</title>
	<meta name="description" content="a local-first brutalist blog" />
</svelte:head>

<div>
	{#each posts as post}
		<article>
			<h2><a href="/post/{post.slug}">{post.title}</a></h2>
			<div class="meta">
				<span>{new Date(post.date).toISOString().split('T')[0]}</span>
				{#if post.tags}
				<div class="tags">
					{#each post.tags as tag}
						<span>#{tag}</span>
					{/each}
				</div>
				{/if}
			</div>
			<p>{post.description}</p>
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
	.tags {
		display: flex;
		gap: 0.5rem;
	}
	.tags span {
		background-color: var(--border);
		padding: 0.2em 0.5em;
		border-radius: 4px;
		color: var(--accent);
	}
</style>