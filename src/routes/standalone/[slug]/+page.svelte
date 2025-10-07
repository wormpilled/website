<!-- /var/www/html/wormpilled/src/routes/standalone/[slug]/+page.svelte -->
<script lang="ts">
	import { page as pageStore } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data;
	$: ({ page } = data);

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
	<title>{page.title}</title>
	<meta name="description" content={page.description} />
</svelte:head>

<article>
	<a href="/standalone" class="back-link">&lt;-- Standalone</a>
	<h1>{page.title}</h1>
	<div class="meta">
		<div class="meta-left">
			<span>Last Updated: {new Date(page.date).toISOString().split('T')[0]}</span>
			{#if page.author}
				<div class="author-info">
					<img src={page.author.avatar} alt="{page.author.name}'s avatar" class="avatar" />
					<div class="author-text">
						<strong>{page.author.name}</strong>
						<p>{page.author.shortBio}</p>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="content" on:click={handleContentClick} role="group">
		{@html page.htmlContent}
	</div>
</article>

<style>
	.back-link {
		display: inline-block;
		margin-bottom: 2rem;
	}
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
	.author-info {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1rem;
	}
	.avatar {
		width: 50px;
		height: 50px;
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
		margin-top: 2.5rem;
	}
	.content :global(h2) {
		font-size: 1.4em;
		margin-top: 2.5rem;
	}
	.content :global(h3) {
		font-size: 1.2em;
		margin-top: 2.5rem;
	}
	.content :global(img) {
		margin: 1.5rem 0;
	}
</style>