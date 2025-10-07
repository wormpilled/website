<!-- /var/www/html/wormpilled/src/routes/authors/[slug]/+page.svelte -->
<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;
	const { author, postsByYearMonth } = data;
	const sortedYears = Object.keys(postsByYearMonth).sort((a, b) => Number(b) - Number(a));
</script>

<svelte:head>
	<title>Transmissions by {author.name}</title>
	<meta name="description" content={`An index of all transmissions by ${author.name}.`} />
</svelte:head>

<div class="author-header">
	<img src={author.avatar} alt="{author.name}'s avatar" class="avatar" />
	<div class="author-details">
		<h1>// {author.name}</h1>
		<p class="bio">{author.longBio || author.shortBio}</p>
	</div>
</div>

<div class="post-list">
	{#each sortedYears as year}
		<h2 class="year-heading">// {year}</h2>
		{#each Object.entries(postsByYearMonth[year]) as [month, posts]}
			<h3 class="month-heading">{month}</h3>
			<ul>
				{#each posts as post}
					<li>
						<a href="/post/{post.slug}">
							<span class="date">{new Date(post.date).toISOString().split('T')[0]}</span>
							<span class="title">{post.title}</span>
						</a>
						<p class="description">{post.description}</p>
					</li>
				{/each}
			</ul>
		{/each}
	{/each}
</div>

<style>
	.author-header {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		border-bottom: 2px solid var(--border);
		padding-bottom: 1.5rem;
		margin-bottom: 2rem;
	}
	.avatar {
		width: 100px;
		height: 100px;
	}
	.author-details h1 {
		border: none;
		margin: 0;
		padding: 0;
	}
	.bio {
		margin-top: 0.5rem;
		color: #aaa;
	}
	.year-heading {
		font-size: 1.6em;
		color: var(--accent);
	}
	.month-heading {
		font-size: 1.2em;
		border-bottom: 1px dashed var(--border);
		padding-left: 1rem;
	}
	.post-list ul {
		list-style: none;
		padding: 0;
		margin-bottom: 2rem;
	}
	.post-list li {
		margin-bottom: 0.8rem;
		border-bottom: 1px dashed var(--border);
		padding-bottom: 0.8rem;
		padding-left: 2rem;
	}
	.post-list li:last-child {
		border-bottom: none;
	}

	.post-list a {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem 1rem;
		color: var(--foreground);
		font-weight: normal;
	}

	.post-list a:hover .title {
		background-color: var(--accent);
		color: var(--background);
	}

	.post-list a .title {
		font-weight: bold;
		color: var(--accent);
		text-decoration: underline;
	}
	.date {
		color: #888;
		font-size: 0.9em;
		flex-shrink: 0;
	}
	.description {
		margin: 0.3rem 0 0 1rem;
		font-size: 0.9em;
	}
</style>