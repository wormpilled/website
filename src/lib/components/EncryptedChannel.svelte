<!-- /var/www/html/wormpilled/src/lib/components/EncryptedChannel.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { getWidgetStyle } from '$lib/widgetStyler';

	let styleString = '';

	onMount(() => {
		const theme = document.documentElement.getAttribute('data-theme') || 'wormpilled';
		styleString = getWidgetStyle('EncryptedChannel', theme);
	});
</script>

<div class="widget" style={styleString}>
	<p class="title">//SECURE_DROP</p>
	<pre>
-----BEGIN PGP MESSAGE-----

hQEMA8Cn/1i2fYrvAQf/ZYM5Qe7+OwbN8A3iG4pUj4x6cIKa6ckSUQf2jg3eF+sh
B9x+r5d7R6eEqQ/L0d0N9j4pWWf5VvxO2J/v6b/uV+9n/l/8qB/5Uq8P9/D/bB/A
...[REDACTED]...
-----END PGP MESSAGE-----
	</pre>
</div>

<style>
	.widget {
		margin-bottom: 1.5rem;
		background-color: var(--widget-background-color);
	}
	.title {
		border-bottom: var(--widget-title-border-bottom);
		padding-bottom: 0.3em;
		margin-bottom: 0.5rem;
		color: var(--widget-title-color);
	}
	pre {
		font-size: 0.7em;
		line-height: 1.2;
		color: var(--widget-paragraph-color);
	}
</style>