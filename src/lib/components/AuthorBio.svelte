<!-- /var/www/html/wormpilled/src/lib/components/AuthorBio.svelte -->
<script lang="ts">
	export let author: {
		slug: string;
		name: string;
		avatar: string;
		shortBio: string;
		longBio?: string;
	};
</script>

<div class="author-bio-card">
	<a href="/authors/{author.slug}" class="avatar-link">
		<img src={author.avatar} alt="{author.name}'s avatar" class="avatar" />
	</a>
	<div class="text-content">
		<p class="written-by">TRANSMISSION BY:</p>
		<a href="/authors/{author.slug}" class="name-link">
			<h3>{author.name}</h3>
		</a>
		<p class="bio">{author.longBio || author.shortBio}</p>
	</div>
</div>

<style>
	.author-bio-card {
		border: 2px solid var(--border); 
		margin-top: 3rem;
		padding: 1.5rem;
		display: flex;
		gap: 1.5rem;
		align-items: flex-start;
	}
	.avatar {
		width: 80px;
		height: 80px;
	}
	.avatar-link {
		border: none;
		background: none;
	}
	.avatar-link:hover {
		background-color: transparent;
	}
	.written-by {
		font-size: 0.8em;
		color: #888;
		margin: 0 0 0.2rem 0;
	}
	h3 {
		margin: 0;
		padding: 0;
		border: none;
		font-size: 1.5em;
		color: var(--accent);
	}
	.name-link {
		font-weight: normal;
	}
	.name-link:hover h3 {
		text-decoration: underline;
		background-color: var(--accent);
		color: var(--background);
	}
	.bio {
		margin: 0rem 0 0 0;
	}
</style>
