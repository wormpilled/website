<!-- /var/www/html/wormpilled/src/routes/misc/bsod/+page.svelte -->
<svelte:head>
	<title>SYSTEM_FAULT</title>
	<meta name="description" content="A fatal exception has occurred." />
</svelte:head>

<div class="bsod-container">
	<div class="content-inner">
		<p>
			A problem has been detected and WORM has been shut down to prevent damage to the node.
		</p>
		<p>KERNEL_DATA_INPAGE_ERROR</p>
		<br />
		<p>
			If this is the first time you've seen this stop error screen, restart the node. If this
			screen appears again, follow these steps:
		</p>
		<p>
			Check to make sure any new hardware or software is properly installed. If this is a new
			installation, ask your hardware or software manufacturer for any updates you might need.
		</p>
		<p>
			If problems continue, disable or remove any newly installed hardware or software. Disable BIOS
			memory options such as caching or shadowing.
		</p>
		<br />
		<p>Technical information:</p>
		<p>*** STOP: 0x0000007A (0xC03A6288, 0xC000000E, 0xBF8F1B3D, 0x08A04860)</p>
		<p>*** FAKESYS.SYS - Address BF8F1B3D base at BF800000, DateStamp 3b7d85aa</p>
		<br />
		<p>Beginning dump of physical memory...</p>
		<p>Physical memory dump complete.</p>
		<p>Contact your system administrator or technical support group for further assistance.</p>
	</div>
</div>

<style>
	.bsod-container {
		width: 100%;
		height: 80vh;
		background-color: #0000aa;
		color: #ffffff;
		font-family: 'Lucida Console', 'Courier New', monospace;
		font-size: 1.1em;
		padding: 2rem;
		box-sizing: border-box;
		overflow: hidden;
	}
	.content-inner p {
		margin: 0.2rem 0;
	}
</style>