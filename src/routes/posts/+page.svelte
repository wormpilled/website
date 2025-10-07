<!-- /var/www/html/wormpilled/src/routes/posts/+page.svelte -->
<script lang="ts">
	import allPosts from '$lib/posts/posts.json';

	const posts = allPosts.filter((p) => p.draft === false);

	function getTagSlug(tag: string) {
		// Replicating the slug logic from build script
		return tag
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.trim()
			.replace(/\s+/g, '-');
	}

	function getDisplayDate(post: any): Date {
		if (post.date_published && typeof post.date_published === 'number' && post.date_published > 0) {
			return new Date(post.date_published * 1000);
		}
		if (post.date && typeof post.date === 'string') {
			const d = new Date(post.date);
			if (!isNaN(d.getTime())) {
				return d;
			}
		}
		if (post.date_created && typeof post.date_created === 'number' && post.date_created > 0) {
			return new Date(post.date_created * 1000);
		}
		return new Date(); // Fallback to prevent crash
	}
</script>

<svelte:head>
	<title>Transmissions</title>
	<meta name="description" content="A list of all transmissions." />
</svelte:head>

<div class="post-list">
	<h1>// ALL TRANSMISSIONS</h1>
	<ul>
		{#each posts as post}
			<li>
				<a href="/post/{post.slug}" class="thumbnail-container">
					{#if post.thumbnail}
						<img src="/{post.thumbnail}" alt="thumbnail for {post.title}" class="thumbnail" />
					{:else}
						<div class="thumbnail-placeholder" />
					{/if}
				</a>
				<div class="post-content">
					<a href="/post/{post.slug}" class="main-link">
						<span class="date">{getDisplayDate(post).toISOString().split('T')[0]}</span>
						<span class="title">{post.title}</span>
					</a>
					{#if post.tags && post.tags.length > 0}
						<div class="tags">
							{#each post.tags as tag}
								<a href="/find/{getTagSlug(tag)}">#{tag}</a>
							{/each}
						</div>
					{/if}
					<p class="description">{post.description}</p>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.post-list ul {
		list-style: none;
		padding: 0;
	}
	.post-list li {
		margin-bottom: 1rem;
		border-bottom: 1px dashed var(--border);
		padding-bottom: 1rem;
		display: flex;
		gap: 1.5rem;
		align-items: flex-start;
	}
	.post-list li:last-child {
		border-bottom: none;
	}

	.thumbnail-container {
		flex-shrink: 0;
		width: 120px;
		height: 90px;
		display: block;
	}
	.thumbnail-container:hover {
		background-color: transparent;
	}

	.thumbnail {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.thumbnail-placeholder {
		width: 100%;
		height: 100%;
		background-color: var(--accent);
		opacity: 0.2;
		border: 1px solid var(--border);
		transition: opacity 0.2s ease;
	}
	.thumbnail-container:hover .thumbnail-placeholder {
		opacity: 0.4;
	}

	.post-content {
		flex-grow: 1;
		min-width: 0; /* Prevents flex item from overflowing */
	}

	.main-link {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem 1rem;
		color: var(--foreground);
		font-weight: normal;
	}

	.main-link:hover {
		background-color: transparent;
	}

	.main-link .title {
		font-weight: bold;
		color: var(--accent);
		text-decoration: underline;
	}
	.main-link:hover .title {
		background-color: var(--accent);
		color: var(--background);
	}

	.date {
		color: #888;
		font-size: 0.9em;
		flex-shrink: 0;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		font-size: 0.8em;
		margin-top: 0.3rem;
	}
	.tags a {
		background-color: var(--border);
		padding: 0.1em 0.4em;
		border-radius: 4px;
		color: var(--accent);
		font-weight: normal;
	}
	.tags a:hover {
		background-color: var(--accent);
		color: var(--background);
		text-decoration: none;
	}
	.description {
		margin: 0.5rem 0 0 0;
		font-size: 0.9em;
	}
</style>