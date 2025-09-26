<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<h1><a href="/">[WORM::PILLED]</a></h1>
	<p>// a local-first brutalist blog</p>
</header>

<slot />

<footer>
	<p>&copy; 2025 // All rights reserved.</p>
</footer>

<style>
	header {
		margin-bottom: 3rem;
		border-bottom: 1px solid var(--border);
		padding-bottom: 1rem;
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
	footer {
		margin-top: 4rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border);
		color: #888;
		font-size: 0.9em;
	}
</style>