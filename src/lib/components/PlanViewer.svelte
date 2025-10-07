<!-- /var/www/html/wormpilled/src/lib/components/PlanViewer.svelte -->
<script lang="ts">
	export let content = '';
</script>

<h1>// .PLAN</h1>
<pre>{content}</pre>
<style>
	pre {
		white-space: pre-wrap;
		word-break: break-all;
	}
</style>