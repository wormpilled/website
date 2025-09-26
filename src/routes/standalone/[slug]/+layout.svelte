<!-- /var/www/html/wormpilled/src/routes/standalone/[slug]/+layout.svelte -->
<script lang="ts">
	import allPages from '$lib/posts/standalone.json';
	/** @type {import('./$types').LayoutData} */
	export let data;
</script>

<div class="page-layout">
	<main class="page-content">
		<slot />
	</main>
	<aside class="page-sidebar">
		{#if data.page}
			{#if data.page.headers && data.page.headers.length > 0}
				<div class="widget">
					<p class="title">// ON THIS PAGE</p>
					<ul>
						{#each data.page.headers as header}
							<li class="level-{header.level}">
								<a href="#{header.id}">{header.text}</a>
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
		border-left: 1px solid var(--border);
		padding-left: 2rem;
	}

	.widget {
		margin-bottom: 2rem;
	}
	.widget .title {
		color: var(--accent);
		border-bottom: 1px solid var(--border);
		padding-bottom: 0.3rem;
		margin-bottom: 0.5rem;
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
