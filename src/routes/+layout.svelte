<!-- /var/www/html/wormpilled/src/routes/+layout.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { isScrolledPastHeader, showStickyHeader, takeover, hideTakeover } from '$lib/stores';

	import favicon from '$lib/assets/favicon.svg';
	import SystemStatus from '$lib/components/SystemStatus.svelte';
	import GeographicSector from '$lib/components/GeographicSector.svelte';
	import Webring from '$lib/components/Webring.svelte';
	import EncryptedChannel from '$lib/components/EncryptedChannel.svelte';
	import Shrine from '$lib/components/Shrine.svelte';
	import SatireBanner from '$lib/components/SatireBanner.svelte';
	import Blinkies from '$lib/components/Blinkies.svelte';
	import Header from '$lib/components/Header.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import UserVitals from '$lib/components/UserVitals.svelte';

	let lastScrollY = 0;
	const headerHeight = 140;

	function handleScroll(isInitialCheck = false) {
		const currentScrollY = window.scrollY;
		const scrolledPast = currentScrollY > headerHeight;
		isScrolledPastHeader.set(scrolledPast);

		if (scrolledPast) {
			if (isInitialCheck) {
				showStickyHeader.set(false);
			} else if (currentScrollY > lastScrollY) {
				showStickyHeader.set(false); // Scrolling down
			} else if (currentScrollY < lastScrollY) {
				showStickyHeader.set(true); // Scrolling up
			}
		} else {
			showStickyHeader.set(true);
		}

		lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;

		if (window.scrollY > 150) {
			document.body.classList.add('scrolled');
		} else {
			document.body.classList.remove('scrolled');
		}
	}

	function handleAnchorLink(hash: string) {
		if (!hash) return;
		// A delay gives the browser time to paint and for our script to override the instant jump.
		setTimeout(() => {
			try {
				const element = document.querySelector(hash);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' });

					// Add visual cue using the existing 'copied' class animation
					element.classList.add('copied');
					setTimeout(() => {
						element.classList.remove('copied');
					}, 1200); // Animation is 1s, add buffer
				}
			} catch (e) {
				console.warn(`Could not find or scroll to anchor element for hash: ${hash}`);
			}
		}, 150);
	}

	onMount(() => {
		document.documentElement.classList.remove('js-loading-anchor');

		setTimeout(() => {
			lastScrollY = window.scrollY;
			handleScroll(true);
			handleAnchorLink(window.location.hash);
		}, 0);

		const scrollListener = () => handleScroll(false);
		window.addEventListener('scroll', scrollListener, { passive: true });

		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				hideTakeover();
			}
		};
		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('scroll', scrollListener);
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	afterNavigate((nav) => {
		hideTakeover();
		if (nav.to?.url.hash) {
			handleAnchorLink(nav.to.url.hash);
		} else {
			window.scrollTo(0, 0);
		}

		setTimeout(() => {
			lastScrollY = window.scrollY;
			handleScroll(true);
		}, 0);
	});

	$: isStandalone = $page.route.id?.includes('/standalone');
	$: isSmallPost = $page.data.isSmallPost ?? false;

	// Helpers for Data Archive sidebar
	function getParentSlug(slug) {
		return slug.includes('-') ? slug.split('-')[0] : slug;
	}
	$: activeArchiveSlug = $page.url.searchParams.get('archive');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="background-tiler" />

<div class="container">
	{#if !$isScrolledPastHeader}
		<Header />
	{/if}
	<Breadcrumbs />

	{#if isSmallPost}
		<div class="small-post-sponsor">
			<SatireBanner marquee={true} />
		</div>
	{/if}

	<div class="main-layout" class:single-column={isStandalone || isSmallPost}>
		{#if !isSmallPost}
			<main class="content">
				{#if $takeover}
					<div class="takeover-container">
						<div class="takeover-header">
							<button class="close-button" on:click={hideTakeover}>[ CLOSE ]</button>
						</div>
						<svelte:component this={$takeover.component} {...$takeover.props} />
					</div>
				{:else}
					<slot />
				{/if}
			</main>
		{/if}

		{#if !isStandalone}
			<aside class="sidebar">
				{#if $page.data.isDataLayout}
					<div class="archive-nav">
						<ul>
							{#each $page.data.archives as archive}
								{@const parentSlug = getParentSlug(archive.slug)}
								<li>
									<a
										href="/data/{parentSlug}?archive={archive.slug}"
										class:active={activeArchiveSlug === archive.slug}
										class="button-link"
										data-sveltekit-noscroll
									>
										{archive.title}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{:else if isSmallPost}
					<div class="content">
						{#if $takeover}
							<div class="takeover-container">
								<div class="takeover-header">
									<button class="close-button" on:click={hideTakeover}>[ CLOSE ]</button>
								</div>
								<svelte:component this={$takeover.component} {...$takeover.props} />
							</div>
						{:else}
							<slot />
						{/if}
					</div>
					<div class="small-post-widget-container">
						<div class="widget-column">
							<UserVitals />
							<Webring />
						</div>
						<div class="widget-column">
							<GeographicSector />
							<Blinkies />
						</div>
						<div class="widget-column">
							<Shrine />
							<EncryptedChannel />
						</div>
					</div>
				{:else}
					<Tags tags={$page.data.post?.tags} />
					<UserVitals />
					<SystemStatus />
					<GeographicSector />
					<Shrine />
					<Webring />
					<Blinkies />
					<EncryptedChannel />
				{/if}
			</aside>
		{/if}
	</div>

	<footer>
		<div class="footer-grid">
			<p>&copy; 2025 // All rights reserved.</p>
			<p>//This site does not track you. There is nothing to consent to.</p>
			<p>//[NO-JS COMPLIANT]</p>
		</div>
	</footer>
</div>

<style>
	:global(.background-tiler) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		pointer-events: none;
		opacity: 1;
		transition: opacity 0.4s ease-out;
	}

	:global(body.scrolled .background-tiler) {
		opacity: 0;
	}

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 1280px;
		margin-left: auto;
		margin-right: auto;
		padding: 0 1rem 1rem 1rem;
		box-sizing: border-box;
	}

	.small-post-sponsor {
	}

	.main-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.3rem;
		flex-grow: 1;
	}

	.content {
		background-color: var(--background);
		border: 1px solid var(--border);
		padding: 1rem 2rem;
		box-shadow: 5px 5px 0px var(--border);
	}

	@media (min-width: 1024px) {
		.main-layout:not(.single-column) {
			grid-template-columns: 1fr 280px;
		}
	}
	.sidebar {
		font-size: 0.9em;
		display: flex;
		flex-direction: column;
	}

	.sidebar :global(.widget) { 
		border: 1px solid var(--border);
		padding: 0.5rem;  box-shadow: 5px 5px 0px var(--border);
		padding-bottom: 30px;
		margin-bottom: 0;
	}

	.sidebar :global(.widget .title) {
		padding-bottom: 0.3rem;
		margin: 0 0 0.5rem 0;
	}
	footer {
		margin-top: 3rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border);
		color: #888;
		font-size: 0.9em;
	}
	.footer-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: space-between;
	}
	.takeover-header {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;
	}
	.close-button {
		font-size: 1em;
	}

	.small-post-widget-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0rem; 
		align-items: start;
	}

	.widget-column {
		display: flex;
		flex-direction: column;
		gap: 0rem;
	}

	.widget-column :global(.widget) {
		margin-bottom: 0;
	}

	/* Styles for Data Archive Sidebar */
	.archive-nav {
		position: sticky;
		top: 60px; /* Space for sticky header */
	}
	.archive-nav ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.archive-nav li {
		margin-bottom: 0.5rem;
	}
	.button-link {
		display: block;
		text-align: left;
		justify-content: flex-start;
		padding: 0.2em 0.5em;
		font-weight: bold;
		color: var(--accent);
		border: 1px solid var(--border);
		background: transparent;
	}
	.button-link:hover {
		background-color: var(--accent);
		color: var(--background);
		text-decoration: none;
	}
	.archive-nav .button-link {
		border-left-width: 4px;
		border-left-color: transparent;
	}
	.archive-nav .button-link.active {
		border-left-color: var(--accent);
		background-color: rgba(255, 255, 255, 0.05);
	}
</style>
