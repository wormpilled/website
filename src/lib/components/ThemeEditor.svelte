<!-- /var/www/html/wormpilled/src/lib/components/ThemeEditor.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

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

	function applyBackground(bgPath: string) {
		const tiler = document.querySelector('.background-tiler') as HTMLElement;
		if (tiler) {
			if (bgPath === 'none') {
				tiler.style.backgroundImage = 'none';
			} else {
				tiler.style.backgroundImage = `url(${bgPath})`;
			}
		}
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
			// Apply a default if nothing is set
			applyBackground(backgrounds[1]);
		}
	});
</script>

<div class="widget">
	<p class="title">//BG_EDITOR</p>
	<button on:click={cycleBackground}>CYCLE_BACKGROUND</button>
	<p class="current-bg">
		Current: {backgrounds[currentBgIndex].replace('/assets/tiled-bg/', '')}
	</p>
</div>

<style>
	.widget {
		margin-bottom: 1.5rem;
	}
	.title {
		border-bottom: 1px solid var(--border);
		padding-bottom: 0.3em;
		margin-bottom: 0.5rem;
		color: var(--accent);
	}
	button {
		width: 100%;
		margin-bottom: 0.5rem;
	}
	.current-bg {
		font-size: 0.8em;
		color: #888;
		text-align: center;
		word-break: break-all;
	}
</style>