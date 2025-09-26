<!-- /var/www/html/wormpilled/src/routes/post/[slug]/+page.svelte -->
<script lang="ts">
	import CritterCounter from '$lib/components/CritterCounter.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	$: ({ post } = data);
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={post.description} />
</svelte:head>

<article>
	<a href="/" class="back-link">&lt;-- Index</a>
	<h1>{post.title}</h1>
	<div class="meta">
		<span>Published on: {new Date(post.date).toISOString().split('T')[0]}</span>
		<CritterCounter slug={post.slug} />
	</div>

	<div class="content">
		{@html post.htmlContent}
	</div>
</article>

<style>
	.meta {
		color: #888;
		margin-bottom: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.content :global(h1) {
		font-size: 1.7em;
		margin-top: 2rem;
	}
	.content :global(h2) {
		font-size: 1.4em;
		margin-top: 2rem;
	}
	.content :global(h3) {
		font-size: 1.2em;
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