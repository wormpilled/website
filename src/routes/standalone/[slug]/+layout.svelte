<!-- /var/www/html/wormpilled/src/routes/standalone/[slug]/+layout.svelte -->
<script lang="ts">
	import allPages from '$lib/posts/standalone.json';
	import { isScrolledPastHeader, showStickyHeader } from '$lib/stores';
	import StickyHeader from '$lib/components/StickyHeader.svelte';
	import Tags from '$lib/components/Tags.svelte';

	/** @type {import('./$types').LayoutData} */
	export let data;

	function handleTocClick(event: MouseEvent, id: string) {
		event.preventDefault(); // Stop the browser's instant jump

		const targetElement = document.getElementById(id);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
			window.history.pushState(null, '', `#${id}`); // Manually update URL

			// Add class to trigger animation defined in +page.svelte
			targetElement.classList.add('copied');
			setTimeout(() => {
				targetElement.classList.remove('copied');
			}, 1000); // Animation duration
		}
	}
</script>

{#if $isScrolledPastHeader && $showStickyHeader}
	<StickyHeader pageData={data.page} />
{/if}

<div class="page-layout">
	<main class="page-content">
		<slot />
	</main>
	<aside class="page-sidebar">
		{#if data.page}
			<Tags tags={data.page.tags} />
			{#if data.page.headers && data.page.headers.length > 0}
				<div class="widget">
					<p class="title">// ON THIS PAGE</p>
					<ul>
						{#each data.page.headers as header}
							<li class="level-{header.level}">
								<a href="#{header.id}" on:click={(e) => handleTocClick(e, header.id)}
									>{header.text}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<div class="widget">
				<p class="title">// MORE STANDALONE</p>
				<ul>
					{#each allPages as page}
						{#if page.slug !== data.page.slug}
							<li><a href="/standalone/{page.slug}">{page.title}</a></li>
						{/if}
					{/each}
				</ul>
			</div>
		{/if}
	</aside>
</div>

<style>
	.page-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.page-layout {
			grid-template-columns: 1fr 250px;
		}
		.page-content {
			order: -1; /* Move content to the left on desktop */
		}
	}

	.page-sidebar {
		font-size: 0.9em;
		position: sticky;
		top: 60px; /* Space for sticky header */
		align-self: start; /* Prevent stretching in grid */
	}

	.widget { 
		margin-bottom: 2rem;
		border: 1px solid var(--border);
		padding: 0.5rem;
		background-color: var(--background);
	}
	.widget .title {
		color: var(--accent);
		border-bottom: 1px solid var(--border);
		padding-bottom: 0.3rem;
		margin: 0 0 0.5rem 0;
	}

	.widget ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.widget li {
		margin-bottom: 0.4rem;
	}

	.level-3 {
		padding-left: 1rem;
	}
</style>
