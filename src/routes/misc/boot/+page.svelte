<!-- /var/www/html/wormpilled/src/routes/misc/boot/+page.svelte -->
<svelte:head>
	<title>SYSTEM_BOOT</title>
	<meta name="description" content="Initiating cold boot sequence..." />
</svelte:head>

<div class="boot-container">
	<pre class="boot-text">
<span style="animation-delay: 0.2s">WORM BIOS v1.33.7, An Awful Company</span>
<span style="animation-delay: 0.5s">Copyright (C) 1988-2025, AwfulCorp.</span>
<span style="animation-delay: 0.8s"></span>
<span style="animation-delay: 1.0s">Main Processor : Sentient Worm Core @ 8.0 GHz</span>
<span style="animation-delay: 1.3s">Memory Testing : 65536K OK</span>
<span style="animation-delay: 1.8s"></span>
<span style="animation-delay: 2.0s">Primary Master : Worm Drive 0, 1024TB</span>
<span style="animation-delay: 2.2s">Primary Slave  : None</span>
<span style="animation-delay: 2.4s">Secondary Master: CD-ROM, ATAPI</span>
<span style="animation-delay: 2.6s">Secondary Slave : None</span>
<span style="animation-delay: 3.0s"></span>
<span style="animation-delay: 3.2s">Detecting USB devices ... </span>
<span style="animation-delay: 3.8s">... 2 Hubs, 1 Keyboard, 1 Mouse, 1 [REDACTED]</span>
<span style="animation-delay: 4.0s"></span>
<span style="animation-delay: 4.2s">Initializing Plug and Play Cards...</span>
<span style="animation-delay: 4.5s">... PnP BIOS extension initialized.</span>
<span style="animation-delay: 4.8s"></span>
<span style="animation-delay: 5.0s">Booting from Primary Master...</span>
<span style="animation-delay: 5.5s">Loading WORM-DOS...</span>
<span style="animation-delay: 6.0s"></span>
<span style="animation-delay: 6.2s">Starting local-first brutalist blog...</span>
<span style="animation-delay: 6.8s">... System integrity verified.</span>
<span style="animation-delay: 7.2s">... Transmissions loaded.</span>
<span style="animation-delay: 7.5s">... Reality matrix stabilized.</span>
<span style="animation-delay: 8.0s"></span>
<span style="animation-delay: 8.2s">SYSTEM READY.</span>
<span style="animation-delay: 8.5s; animation-iteration-count: infinite;">C:\> _</span>
    </pre>
</div>

<style>
	.boot-container {
		width: 100%;
		height: 80vh;
		background-color: #000;
		color: #ccc;
		font-family: 'Lucida Console', 'Courier New', monospace;
		font-size: 1em;
		padding: 1rem;
		box-sizing: border-box;
		overflow-y: auto;
		border: 1px solid var(--border);
	}
	.boot-text span {
		display: block;
		opacity: 0;
		animation: fadeIn 0.1s forwards;
		white-space: pre;
	}

	.boot-text span:last-child {
		animation: fadeIn 0.1s forwards, blink 1.2s step-end infinite;
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>