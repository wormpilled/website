<!-- /var/www/html/wormpilled/src/routes/+layout.svelte -->
<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import UptimeCounter from '$lib/components/UptimeCounter.svelte';
	import SystemLoad from '$lib/components/SystemLoad.svelte';
	import HexClock from '$lib/components/HexClock.svelte';
	import BiometricStatus from '$lib/components/BiometricStatus.svelte';
	import ConnectionStatus from '$lib/components/ConnectionStatus.svelte';
	import GeographicSector from '$lib/components/GeographicSector.svelte';
	import SessionLog from '$lib/components/SessionLog.svelte';
	import Webring from '$lib/components/Webring.svelte';
	import EncryptedChannel from '$lib/components/EncryptedChannel.svelte';
	import KnownAliases from '$lib/components/KnownAliases.svelte';
	import Shrine from '$lib/components/Shrine.svelte';
	import IncidentCounter from '$lib/components/IncidentCounter.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import SatireBanner from '$lib/components/SatireBanner.svelte';

	let showPlanModal = false;
	let planContent = 'Loading...';

	async function openPlanModal() {
		try {
			const response = await fetch('/plan.txt');
			if (response.ok) {
				planContent = await response.text();
			} else {
				planContent = 'Error: Could not load plan file.';
			}
		} catch (error) {
			planContent = 'Error: Could not fetch plan file.';
		}
		showPlanModal = true;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Modal bind:show={showPlanModal}>
	<pre>{planContent}</pre>
</Modal>

<div class="container">
	<header>
		<h1><a href="/">[WORM::PILLED]</a></h1>
		<p>// a local-first brutalist blog</p>
		<nav>
			<ul>
				<li><a href="/contact">//LEAVE_A_TRACE</a></li>
				<li><button on:click={openPlanModal}>//CHECK_PLAN</button></li>
				<li><a href="/standalone">//STANDALONE</a></li>
				<ThemeSwitcher />
				<li>
					<a
						href="https://mastodon.social/@example"
						target="_blank"
						rel="me noopener noreferrer"
						>//FEDIVERSE</a
					>
				</li>
				<li>
					<a href="gemini://example.com/" rel="noopener noreferrer">//GEMINI_CAPSULE</a>
				</li>
				<li>
					<a href="https://example.neocities.org" target="_blank" rel="noopener noreferrer"
						>//HOMESTEAD</a
					>
				</li>
				<li>
					<a href="https://github.com/example/dotfiles" target="_blank" rel="noopener noreferrer"
						>//DOTFILES</a
					>
				</li>
			</ul>
		</nav>
	</header>

	<Breadcrumbs />

	<div class="main-layout">
		<main class="content">
			<slot />
		</main>

		<aside class="sidebar">
			<!-- Tier 1: System Status & Personal Metrics -->
			<UptimeCounter />
			<IncidentCounter />
			<SystemLoad />
			<HexClock />
			<BiometricStatus />
			<ConnectionStatus />
			<GeographicSector />
			<SessionLog />

			<!-- Tier 1: Outlinks & Network Nodes -->
			<div class="widget">
				<p class="title">//DARKNET_NODE</p>
				<p>[onion_address.onion]</p>
			</div>

			<div class="widget">
				<p class="title">//PUBLIC_COMMS_RELAY</p>
				<ul>
					<li>// Mumble</li>
					<li>// XMPP</li>
				</ul>
			</div>

			<Webring />
			<KnownAliases />

			<!-- Tier 1: Static & Philosophical -->
			<Shrine />
			<SatireBanner />
			<EncryptedChannel />
		</aside>
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
	:global(button) {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		font-family: inherit;
		font-size: inherit;
		cursor: pointer;
		color: var(--accent);
		font-weight: bold;
	}
	:global(button:hover) {
		text-decoration: underline;
		background-color: var(--accent);
		color: var(--background);
	}

	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
		max-width: 1280px;
		margin: 0 auto;
		padding: 1rem;
		box-sizing: border-box;
	}

	header {
		margin-bottom: 3rem;
		border-bottom: 1px solid var(--border);
		padding-bottom: 1rem;
	}

	nav {
		margin-top: 1.5rem;
	}

	nav ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	h1 a {
		color: var(--foreground);
		text-decoration: none;
	}

	h1 a:hover {
		background-color: transparent;
		text-decoration: underline;
		color: var(--accent);
	}

	.main-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		flex-grow: 1;
	}

	@media (min-width: 1024px) {
		.main-layout {
			grid-template-columns: 1fr 250px;
		}
	}

	.sidebar {
		border-left: 1px solid var(--border);
		padding-left: 2rem;
		font-size: 0.9em;
	}

	.sidebar ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.sidebar li {
		margin-bottom: 0.3rem;
	}
	.sidebar .widget .title {
		color: var(--accent);
		border-bottom: 1px solid var(--border);
		padding-bottom: 0.3rem;
		margin-bottom: 0.5rem;
	}

	.sidebar .widget {
		margin-bottom: 1.5rem;
	}

	.sidebar .widget p {
		margin: 0;
	}

	footer {
		margin-top: 4rem;
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
</style>
