<!-- /var/www/html/wormpilled/src/routes/+page.svelte -->
<script lang="ts">
	// This data could be moved to a JSON file if it becomes more complex.
	const author = {
		name: 'wormpilled',
		avatar: '/assets/avatar/wormpilled.gif',
		shortBio: 'A local-first brutalist entity.',
		longBio: `
			<p>Systems online. Core functions nominal. This node serves as a repository for transmissions, standalone documents, and system logs.</p>
			<p>My designation is a construct. The data is the signal. All content is generated locally and deployed statically. There is no server-side logic, no database, no tracking. Only files.</p>
			<p>Navigate to the <a href="/posts">transmissions log</a> to view all posts, or use the header navigation to explore other sectors.</p>
		`
	};
</script>

<svelte:head>
	<title>wormpilled</title>
	<meta name="description" content="a local-first brutalist blog" />
</svelte:head>

<article class="intro">
	<h1>// NODE_INDEX</h1>
	<div class="author-info">
		<img src={author.avatar} alt="{author.name}'s avatar" class="avatar" />
		<div class="author-text">
			<strong>{author.name}</strong>
			<p>{author.shortBio}</p>
		</div>
	</div>
	<div class="bio-content">
		{@html author.longBio}
	</div>
</article>

<style>
	.intro {
	}
	.author-info {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
		margin-bottom: 2rem;
		border-bottom: 1px dashed var(--border);
		padding-bottom: 1rem;
	}
	.avatar {
		width: 75px;
		height: 75px;
	}
	.author-text {
		font-size: 1em;
	}
	.author-text strong {
		color: var(--foreground);
		font-size: 1.2em;
	}
	.author-text p {
		margin: 0;
		color: #aaa;
	}
	.bio-content {
		font-size: 1.1em;
		line-height: 1.6;
	}
	.bio-content :global(p) {
		margin-bottom: 1rem;
	}
</style>
