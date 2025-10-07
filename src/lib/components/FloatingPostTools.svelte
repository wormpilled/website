<!-- /var/www/html/wormpilled/src/lib/components/FloatingPostTools.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import ShareModal from '$lib/components/ShareModal.svelte';
	import { showTakeover } from '$lib/stores';

	/** @type {any} */
	export let navigation;
	/** @type {any} */
	export let post;

	$: shareUrl = `${$page.url.origin}/post/${post.slug}`;

	function openShareTakeover() {
		showTakeover(ShareModal, { title: post.title, url: shareUrl });
	}
</script>

<div class="tool-belt">
	{#if navigation.prev}
		<a
			href={navigation.prev.slug.startsWith('/') ? navigation.prev.slug : `/post/${navigation.prev.slug}`}
			class="tool-button nav-link"
		>
			<span class="label">&lt;--</span>
			<span class="title">PREVIOUS</span>
		</a>
	{/if}

	<button class="tool-button" on:click={openShareTakeover}>
		<span class="label">[ S ]</span>
		<span class="title">SHARE</span>
	</button>

	{#if navigation.next}
		<a
			href={navigation.next.slug.startsWith('/') ? navigation.next.slug : `/post/${navigation.next.slug}`}
			class="tool-button nav-link"
		>
			<span class="label">--&gt;</span>
			<span class="title">NEXT</span>
		</a>
	{/if}
</div>

<style>
	.tool-belt {
		display: flex;
		flex-direction: column;
		font-size: 1rem; /* Reset font size to prevent inheritance issues from sidebar */
	}

	.tool-button {
		border: 1px solid var(--border);
		padding: 0.5rem;
		width: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		background-color: var(--background); /* Add background for visibility */
	}

	.tool-button:hover {
		border-color: var(--accent);
		background-color: var(--background);
	}

	.label {
		font-size: 1.2em;
		font-weight: bold;
		color: var(--accent);
	}
	.title {
		font-size: 0.8em;
		color: #888;
	}

	/* Mobile & Tablet: Below content, aligned right */
	@media (max-width: 1439px) {
		.tool-belt {
			flex-direction: row;
			justify-content: flex-end;
			margin-top: 2rem;
			margin-bottom: -2rem; /* Pull bottom nav closer */
			gap: 1rem;
		}
		.tool-button {
			width: 120px;
		}
		/* Hide redundant nav links, only show share */
		.tool-belt .nav-link {
			display: none;
		}
	}

	/* Desktop: Fixed position to the left of content */
	@media (min-width: 1440px) {
		.tool-belt {
			position: fixed;
			top: calc(var(--header-height) + 1rem);
			right: calc(50% + 640px - 1rem);
			width: 100px;
			z-index: 5;
			align-items: flex-end;
		}

		.tool-belt .tool-button {
			width: auto; /* Allow buttons to size to their content */ 
		}
	}
</style>
