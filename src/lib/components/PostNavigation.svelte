<!-- /var/www/html/wormpilled/src/lib/components/PostNavigation.svelte -->
<script lang="ts">
	/** @type {any} */
	export let navigation;
</script>

<nav class="post-navigation">
	<div class="nav-link prev">
		{#if navigation.prev}
			<a href={navigation.prev.slug.startsWith('/') ? navigation.prev.slug : `/post/${navigation.prev.slug}`}>
				<span class="label">&lt;-- PREVIOUS</span>
				<span class="title">{navigation.prev.title}</span>
			</a>
		{/if}
	</div>
	<div class="nav-link next">
		{#if navigation.next}
			<a href={navigation.next.slug.startsWith('/') ? navigation.next.slug : `/post/${navigation.next.slug}`}>
				<span class="label">NEXT --&gt;</span>
				<span class="title">{navigation.next.title}</span>
			</a>
		{/if}
	</div>
</nav>

<style>
	.post-navigation {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 3rem;
		border-top: 1px solid var(--border);
		padding-top: 1rem;
	}

	.nav-link {
		flex-basis: 48%;
		min-width: 0;
	}

	.nav-link a {
		display: block;
		border: 1px solid var(--border);
		padding: 0.5rem 1rem;
		height: 100%;
		box-sizing: border-box;
	}

	.nav-link a:hover {
		background-color: var(--background);
		border-color: var(--accent);
		text-decoration: none;
	}

	.nav-link .label {
		font-size: 0.8em;
		color: #888;
		display: block;
	}

	.nav-link .title {
		font-weight: bold;
		color: var(--accent);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
	}

	.nav-link.next {
		text-align: right;
	}
</style>