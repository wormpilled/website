<!-- /var/www/html/wormpilled/src/routes/key/+page.svelte -->
<svelte:head>
	<title>PGP KEY</title>
	<meta name="description" content="Public encryption key" />
</svelte:head>

<article>
	<h1>// PGP Public Key</h1>
	<p>For secure communication, use the public key below.</p>
	<pre>
-----BEGIN PGP PUBLIC KEY BLOCK-----

mQINBF+3aVsBEAD...[REDACTED]...
...
-----END PGP PUBLIC KEY BLOCK-----
	</pre>
	<a href="/">&lt;-- Index</a>
</article>

<style>
	pre {
		margin-top: 2rem;
		margin-bottom: 2rem;
		font-size: 0.8em;
	}
</style>
