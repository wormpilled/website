<!-- /var/www/html/wormpilled/src/routes/author/+page.svelte -->
<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;
	const { authors } = data;
</script>

<svelte:head>
	<title>Authors</title>
	<meta name="description" content="An index of all site authors." />
</svelte:head>

<h1>// ALL AUTHORS</h1>
<p>An index of all entities contributing transmissions to this node.</p>

<div class="author-grid">
	{#each authors as author}
		<a href="/author/{author.slug}" class="author-card">
			<img src={author.avatar} alt="{author.name}'s avatar" class="avatar" />
			<div class="details">
				<h2>{author.name}</h2>
				<p>{author.shortBio}</p>
			</div>
		</a>
	{/each}
</div>

<style>
	.author-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}
	.author-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		border: 1px solid var(--border);
		padding: 1rem;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease;
	}
	.author-card:hover {
		background-color: rgba(255, 255, 255, 0.05);
		border-color: var(--accent);
		text-decoration: none;
	}
	.avatar {
		width: 60px;
		height: 60px;
		flex-shrink: 0;
	}
	.details h2 {
		border: none;
		padding: 0;
		margin: 0;
		font-size: 1.2em;
		color: var(--accent);
	}
	.author-card:hover h2 {
		text-decoration: underline;
	}
	.details p {
		margin: 0.3rem 0 0 0;
		font-size: 0.9em;
		color: #aaa;
	}
</style>