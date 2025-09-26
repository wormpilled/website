<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;
	const { post } = data;
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={post.description} />
</svelte:head>

<article>
	<a href="/" class="back-link">&lt;-- Index</a>
	<h1>{post.title}</h1>
	<p class="meta">Published on: {new Date(post.date).toISOString().split('T')[0]}</p>
	
	<div class="content">
		{@html post.htmlContent}
	</div>
</article>

<style>
	.meta {
		color: #888;
		margin-bottom: 2rem;
	}
	.content :global(h1),
	.content :global(h2),
	.content :global(h3) {
		margin-top: 2rem;
	}
	.content :global(img) {
		margin: 1.5rem 0;
	}
	.back-link {
		display: inline-block;
		margin-bottom: 2rem;
	}
</style>