<!-- /var/www/html/wormpilled/src/routes/misc/matrix/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let w = (canvas.width = canvas.clientWidth);
		let h = (canvas.height = canvas.clientHeight);

		const resizeObserver = new ResizeObserver(() => {
			w = canvas.width = canvas.clientWidth;
			h = canvas.height = canvas.clientHeight;
			columns = Math.floor(w / 20);
			drops = [];
			for (let i = 0; i < columns; i++) {
				drops[i] = 1;
			}
		});
		resizeObserver.observe(canvas.parentElement!);

		let columns = Math.floor(w / 20);
		let drops: number[] = [];
		for (let i = 0; i < columns; i++) {
			drops[i] = 1;
		}

		const str = ' wormpilled matrix has you glitch ';

		function draw() {
			ctx!.fillStyle = 'rgba(0,0,0,0.05)';
			ctx!.fillRect(0, 0, w, h);
			ctx!.fillStyle = 'var(--accent, #0f0)';
			ctx!.font = '15px monospace';

			for (let i = 0; i < drops.length; i++) {
				const text = str[Math.floor(Math.random() * str.length)];
				ctx!.fillText(text, i * 20, drops[i] * 20);
				if (drops[i] * 20 > h && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}
		}

		const interval = setInterval(draw, 33);

		return () => {
			clearInterval(interval);
			resizeObserver.disconnect();
		};
	});
</script>

<svelte:head>
	<title>WAKE_UP</title>
	<meta name="description" content="Follow the white rabbit." />
</svelte:head>

<div class="matrix-container">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.matrix-container {
		width: 100%;
		height: 80vh;
		background: #000;
		border: 1px solid var(--border);
		overflow: hidden;
	}
	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>