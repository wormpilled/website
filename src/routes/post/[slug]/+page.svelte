<!-- /var/www/html/wormpilled/src/routes/post/[slug]/+page.svelte -->
<script lang="ts">
	import { page as pageStore } from '$app/stores';
	import CritterCounter from '$lib/components/CritterCounter.svelte';
	import StickyHeader from '$lib/components/StickyHeader.svelte';
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import FloatingPostTools from '$lib/components/FloatingPostTools.svelte';
	import PostNavigation from '$lib/components/PostNavigation.svelte';
	import { isScrolledPastHeader, showStickyHeader } from '$lib/stores';

	/** @type {import('./$types').PageData} */
	export let data;
	$: ({ post, isSmallPost, navigation } = data);

	function getPublishedDate(p: any): Date {
		if (p.date_published && typeof p.date_published === 'number' && p.date_published > 0) {
			return new Date(p.date_published * 1000);
		}
		if (p.date && typeof p.date === 'string') {
			const d = new Date(p.date);
			if (!isNaN(d.getTime())) {
				return d;
			}
		}
		if (p.date_created && typeof p.date_created === 'number' && p.date_created > 0) {
			return new Date(p.date_created * 1000);
		}
		return new Date(); // Fallback
	}

	function getTagSlug(tag: string) {
		return tag
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.trim()
			.replace(/\s+/g, '-');
	}

	$: publishedDate = getPublishedDate(post);
	$: modifiedDate =
		post.date_modified && typeof post.date_modified === 'number' && post.date_modified > 0
			? new Date(post.date_modified * 1000)
			: null;

	// Show modified date if it's a valid date and is meaningfully different from published date
	$: showModifiedDate =
		modifiedDate &&
		post.date_published && // must have a published date to compare
		post.date_modified && // must have a modified date
		post.date_modified > post.date_published &&
		publishedDate.toISOString().split('T')[0] !== modifiedDate.toISOString().split('T')[0];

	async function handleContentClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (target && ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(target.tagName)) {
			const id = target.getAttribute('id');
			if (id) {
				const url = new URL($pageStore.url);
				url.hash = id;
				try {
					await navigator.clipboard.writeText(url.href);
					// Manually update the URL in the address bar
					window.history.pushState(null, '', url.hash);
					target.classList.add('copied');
					setTimeout(() => {
						target.classList.remove('copied');
					}, 1000); // Animation duration
				} catch (err) {
					console.error('Failed to copy: ', err);
				}
			}
		}
	}
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={post.description} />
</svelte:head>

<article class:small-post={isSmallPost}>
	{#if $isScrolledPastHeader && $showStickyHeader}
		<StickyHeader pageData={post} />
	{/if}

	{#if !isSmallPost}
		<a href="/posts" class="back-link">&lt;-- Transmissions</a>
	{/if}

	<h1>{post.title}</h1>
	<div class="meta">
		<div class="meta-left">
			<div class="meta-dates">
				<span>Published on: {publishedDate.toISOString().split('T')[0]}</span>
				{#if showModifiedDate && modifiedDate}
					<span class="modified-date"
						>(Last modified: {modifiedDate.toISOString().split('T')[0]})</span
					>
				{/if}
			</div>
			{#if isSmallPost && post.tags && post.tags.length > 0}
				<div class="tags">
					{#each post.tags as tag}
						<a href="/find/{getTagSlug(tag)}">#{tag}</a>
					{/each}
				</div>
			{/if}
			{#if post.author}
				<div class="author-info">
					<a href="/authors/{post.author.slug}" class="avatar-link">
						<img src={post.author.avatar} alt="{post.author.name}'s avatar" class="avatar" />
					</a>
					<div class="author-text">
						<a href="/authors/{post.author.slug}">
							<strong>{post.author.name}</strong>
						</a>
						<p>{post.author.shortBio}</p>
					</div>
				</div>
			{/if}
		</div>
		<div class="meta-right">
			<CritterCounter slug={post.slug} />
		</div>
	</div>

	<!-- svelte-ignore a11y-no-static-element-interactions, a11y-click-events-have-key-events -->
	<div class="content" on:click={handleContentClick} role="group">
		{@html post.htmlContent}
	</div>
</article>

{#if post.author}
	<AuthorBio author={post.author} />
{/if}

{#if navigation}
	<FloatingPostTools {navigation} {post} />
	<PostNavigation {navigation} />
{/if}

<style>
	.meta {
		color: #888;
		margin-bottom: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 1rem;
		border-bottom: 1px dashed var(--border);
		padding-bottom: 1rem;
	}
	.meta-dates {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: baseline;
		margin-bottom: 0.5rem;
	}
	.modified-date {
		font-size: 0.9em;
		color: #aaa;
	}
	.author-info {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1rem;
	}
	.avatar-link {
		border: none;
		background: none;
		line-height: 0; /* Prevents extra space under the image */
	}
	.avatar-link:hover {
		background: none;
	}
	.avatar {
		width: 50px;
		height: 50px;
	}
	.author-text a {
		font-weight: normal;
	}
	.author-text a:hover strong {
		background-color: var(--accent);
		color: var(--background);
		text-decoration: underline;
	}
	.author-text {
		font-size: 0.9em;
	}
	.author-text strong {
		color: var(--foreground);
		font-size: 1.1em;
	}
	.author-text p {
		margin: 0;
		color: #aaa;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		font-size: 0.8em;
		margin-top: 1rem;
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

	.content :global(h1),
	.content :global(h2),
	.content :global(h3),
	.content :global(h4),
	.content :global(h5),
	.content :global(h6) {
		cursor: pointer;
		position: relative;
	}

	.content :global(h1::before),
	.content :global(h2::before),
	.content :global(h3::before),
	.content :global(h4::before),
	.content :global(h5::before),
	.content :global(h6::before) {
		content: '# ';
		color: var(--border);
		position: absolute;
		left: -1.2em;
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
	}

	.content :global(h1:hover::before),
	.content :global(h2:hover::before),
	.content :global(h3:hover::before),
	.content :global(h4:hover::before),
	.content :global(h5:hover::before),
	.content :global(h6:hover::before) {
		opacity: 1;
	}

	.content :global(h1.copied),
	.content :global(h2.copied),
	.content :global(h3.copied),
	.content :global(h4.copied),
	.content :global(h5.copied),
	.content :global(h6.copied) {
		animation: fade-out 1s ease-out;
	}

	@keyframes fade-out {
		0% {
			background-color: var(--accent);
			color: var(--background);
		}
		100% {
			background-color: transparent;
			color: var(--foreground);
		}
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

	/* Styles for when a post is rendered as a widget */
	.small-post h1 {
		font-size: 1.2rem;
		margin-top: 0;
		color: var(--accent);
	}
</style>