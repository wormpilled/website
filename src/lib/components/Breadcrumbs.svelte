<!-- /var/www/html/wormpilled/src/lib/components/Breadcrumbs.svelte -->
<script lang="ts">
	import { page } from '$app/stores';

	$: pathSegments = $page.url.pathname.split('/').filter(Boolean);
</script>

<div class="breadcrumbs">
	/home/wormpilled{#if pathSegments.length > 0}/{pathSegments.join('/')}{/if}
</div>

<style>
	.breadcrumbs {
		font-family: 'SF Mono', 'Consolas', 'Menlo', monospace;
		color: var(--accent);
		margin-bottom: 1rem;
		word-break: break-all;
	}
</style>
