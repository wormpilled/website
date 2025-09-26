<!-- /var/www/html/wormpilled/src/routes/av-test/+page.svelte -->
<svelte:head>
	<title>A/V TEST</title>
</svelte:head>

<div class="test-pattern">
	<div class="bars">
		<div style="background-color: #c0c0c0;"></div>
		<div style="background-color: #c0c000;"></div>
		<div style="background-color: #00c0c0;"></div>
		<div style="background-color: #00c000;"></div>
		<div style="background-color: #c000c0;"></div>
		<div style="background-color: #c00000;"></div>
		<div style="background-color: #0000c0;"></div>
	</div>
	<div class="grid-overlay"></div>
	<div class="scanlines"></div>
</div>

<style>
	.test-pattern {
		position: relative;
		width: 100%;
		height: 80vh;
		border: 2px solid var(--border);
		overflow: hidden;
	}
	.bars {
		display: flex;
		width: 100%;
		height: 100%;
	}
	.bars div {
		width: 100%;
		height: 100%;
	}
	.grid-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image:
			linear-gradient(rgba(0,255,0,0.2) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0,255,0,0.2) 1px, transparent 1px);
		background-size: 50px 50px;
	}
	.scanlines {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.3),
			rgba(0, 0, 0, 0.3) 1px,
			transparent 1px,
			transparent 3px
		);
	}
</style>
