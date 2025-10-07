<!-- /var/www/html/wormpilled/src/routes/misc/+page.svelte -->
<svelte:head>
	<title>MISC</title>
	<meta name="description" content="A collection of miscellaneous toys and anomalies." />
</svelte:head>

<div>
	<h1>// MISCELLANEOUS</h1>
	<p>A collection of strange, useless, or otherwise uncategorized node functions.</p>
	<ul class="page-list">
		<li>
			<a href="/misc/boot">
				<span class="title">SYSTEM_BOOT</span>
			</a>
			<p class="description">Initiate a cold boot sequence simulation.</p>
		</li>
		<li>
			<a href="/misc/matrix">
				<span class="title">WAKE_UP</span>
			</a>
			<p class="description">The matrix has you. Follow the white rabbit.</p>
		</li>
		<li>
			<a href="/misc/bsod">
				<span class="title">SYSTEM_FAULT</span>
			</a>
			<p class="description">Trigger a simulated kernel panic.</p>
		</li>
		<li>
			<a href="/av-test">
				<span class="title">A/V_TEST</span>
			</a>
			<p class="description">Standard audio/visual test pattern.</p>
		</li>
	</ul>
</div>

<style>
	.page-list {
		list-style: ':: ';
		padding-left: 1.5rem;
		margin-top: 2rem;
	}
	.page-list li {
		margin-bottom: 1rem;
	}

	.page-list a {
		font-weight: normal;
		color: var(--foreground);
	}

	.page-list a .title {
		font-weight: bold;
		color: var(--accent);
		font-size: 1.1em;
		text-decoration: underline;
	}

	.page-list a:hover .title {
		background-color: var(--accent);
		color: var(--background);
	}

	.description {
		font-size: 0.9em;
		margin: 0.2rem 0 0 0;
	}
</style>