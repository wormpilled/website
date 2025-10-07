<!-- /var/www/html/wormpilled/src/lib/components/ConfigModal.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { themes } from '$lib/themes';

	// --- Theme Logic ---
	let currentTheme: string;
	onMount(() => {
		currentTheme = document.documentElement.getAttribute('data-theme') || 'wormpilled';
	});
	function switchTheme(themeName: string) {
		document.documentElement.setAttribute('data-theme', themeName);
		localStorage.setItem('theme', themeName);
		currentTheme = themeName;
	}

	// --- Background Logic ---
	const backgrounds = [
		'none',
		'/assets/tiled-bg/static.gif',
		'/assets/tiled-bg/blocks.gif',
		'/assets/tiled-bg/computer.gif',
		'/assets/tiled-bg/bats.gif',
		'/assets/tiled-bg/animate.gif',
		'/assets/tiled-bg/bubble_purple.gif',
		'/assets/tiled-bg/bubble_blue.gif',
		'/assets/tiled-bg/pentagram.jpg',
		'/assets/tiled-bg/purple_wave.jpg',
		'/assets/tiled-bg/grass.png',
		'/assets/tiled-bg/grass2.png',
		'/assets/tiled-bg/trees.png',
		'/assets/tiled-bg/smileys02.gif',
		'/assets/tiled-bg/bubble_3d.jpg'
	];
	let currentBgIndex = 0;
	let currentBgDisplay = '';

	function applyBackground(bgPath: string) {
		const tiler = document.querySelector('.background-tiler') as HTMLElement;
		if (tiler) {
			tiler.style.backgroundImage = bgPath === 'none' ? 'none' : `url(${bgPath})`;
		}
		currentBgDisplay = bgPath.replace('/assets/tiled-bg/', '');
	}
	function cycleBackground() {
		currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
		const nextBg = backgrounds[currentBgIndex];
		applyBackground(nextBg);
		localStorage.setItem('backgroundTheme', nextBg);
	}
	onMount(() => {
		const savedBg = localStorage.getItem('backgroundTheme');
		if (savedBg && backgrounds.includes(savedBg)) {
			currentBgIndex = backgrounds.indexOf(savedBg);
			applyBackground(savedBg);
		} else {
			applyBackground(backgrounds[1]); // Default
		}
	});

	// --- Cursor Logic ---
	let useCustomCursor: boolean;
	function toggleCursor() {
		useCustomCursor = !useCustomCursor;
		document.documentElement.classList.toggle('custom-cursor', useCustomCursor);
		localStorage.setItem('cursor_preference', useCustomCursor ? 'custom' : 'default');
	}
	onMount(() => {
		// We default to custom unless 'default' is explicitly set
		const savedCursor = localStorage.getItem('cursor_preference');
		useCustomCursor = savedCursor !== 'default';
		document.documentElement.classList.toggle('custom-cursor', useCustomCursor);
	});
</script>

<div class="config-panel">
	<h1>// SYSTEM_CONFIG</h1>

	<div class="widget">
		<p class="title">// VISUAL_THEME</p>
		<div class="theme-buttons">
			{#each Object.entries(themes) as [key, { name }]}
				<button class:active={currentTheme === key} on:click={() => switchTheme(key)}>
					{name}
				</button>
			{/each}
		</div>
	</div>

	<div class="widget">
		<p class="title">// BACKGROUND_TEXTURE</p>
		<button on:click={cycleBackground}>CYCLE_BACKGROUND</button>
		<p class="current-setting">Current: {currentBgDisplay}</p>
	</div>

	<div class="widget">
		<p class="title">// CURSOR_STYLE</p>
		<button on:click={toggleCursor}>
			SWITCH TO [{useCustomCursor ? 'DEFAULT' : 'CUSTOM'}]
		</button>
		<p class="current-setting">Current: {useCustomCursor ? 'Custom' : 'Default'}</p>
	</div>
</div>

<style>
	.config-panel {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.widget {
		border: 1px solid var(--border);
		padding: 1rem;
	}
	.title {
		color: var(--accent);
		border-bottom: 1px solid var(--border);
		padding-bottom: 0.3rem;
		margin: 0 0 1rem 0;
		font-weight: bold;
	}
	.theme-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.theme-buttons button.active {
		background-color: var(--accent);
		color: var(--background);
		border-color: var(--accent);
	}
	.current-setting {
		font-size: 0.8em;
		color: #888;
		text-align: center;
		margin: 0.5rem 0 0 0;
		word-break: break-all;
	}
	button {
		width: 100%;
	}
</style>