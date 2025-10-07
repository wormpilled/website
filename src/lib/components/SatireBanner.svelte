<!-- /var/w ww/html/wormpilled/src/lib/components/SatireBanner.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import banners from '$lib/data/satire_banners.json';
	import { getWidgetStyle } from '$lib/widgetStyler';

	export let marquee = false; // Controls the marquee animation

	let bannerHtml = '';
	let styleString = '';

	onMount(() => {
		const randomBanner = banners[Math.floor(Math.random() * banners.length)];
		const theme = document.documentElement.getAttribute('data-theme') || 'wormpilled';
		styleString = getWidgetStyle('SatireBanner', theme);

		const svgString = randomBanner.svg;

		if (marquee) {
			// --- Marquee logic for the large banner ---
			const textRegex = /<text([^>]+)>(.*?)<\/text>/s;
			const match = svgString.match(textRegex);

			if (match) {
				let attrs = match[1];
				const content = match[2].trim();

				attrs = attrs.replace(/\s(x|text-anchor)="[^"]*"/g, '');

				const viewBoxRegex = /viewBox="0 0 ([\d.]+) ([\d.]+)"/;
				const viewBoxMatch = svgString.match(viewBoxRegex);
				const viewBoxWidth = viewBoxMatch ? parseFloat(viewBoxMatch[1]) : 468;

				const estimatedTextWidth = content.length * 6;
				const speed = 35; // units per second
				const duration = (viewBoxWidth + estimatedTextWidth) / speed;

				// Randomize direction
				const goesRightToLeft = Math.random() > 0.5;
				const from = goesRightToLeft ? viewBoxWidth : -estimatedTextWidth;
				const to = goesRightToLeft ? -estimatedTextWidth : viewBoxWidth;

				// Randomize starting position by setting a negative begin time, making it visible on load
				const randomStartOffset = Math.random() * duration;
				const begin = `-${randomStartOffset.toFixed(2)}s`;

				const newTextElement = `
					<text${attrs}>
						<animate attributeName="x" from="${from}" to="${to}" dur="${duration.toFixed(2)}s" begin="${begin}" repeatCount="indefinite" />
						${content}
					</text>
				`;

				bannerHtml = svgString.replace(textRegex, newTextElement);
			} else {
				bannerHtml = svgString; // Fallback if regex fails
			}
		} else {
			// For the static sidebar version, just use the SVG as is.
			bannerHtml = svgString;
		}
	});
</script>

<div class="widget" style={styleString}>
	<div class="banner-container" class:marquee-container={marquee}>
		{@html bannerHtml}
	</div>
	<p class="title" class:marquee-style={marquee}>
		<b>CloudMaster</b> sponsor feed. Compliance report: <i>temporarily authorized</i>.
	</p>
</div>

<style>
	.title { 
		padding-top: 0.3em;
		margin-top: 0.5rem; 
		font-size: 0.8em; 
	}  
	/* Restored styles for the marquee version, exactly as specified */
	.marquee-style { 
		margin: 0;
		padding: 0;
		font-size: 11px;
		padding-left: 2rem;
		color: var(--background-alt);
	}

	.banner-container {
		background-color: var(--widget-background-color);
		border: 1px solid var(--border);
		padding: 0.5rem;
	}
	
	.marquee-container {
		/* Use aspect-ratio to prevent content layout shift while SVG loads */
		aspect-ratio: 468 / 60;
		overflow: hidden; /* Hide marquee text when it's outside the viewbox */
	}

	.banner-container :global(svg) {
		display: block;
		width: 100%;
		height: 100%; /* Fill the container */
	}
</style>
