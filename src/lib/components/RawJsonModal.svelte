<!-- /var/www/html/wormpilled/src/lib/components/RawJsonModal.svelte -->
<script lang="ts">
	export let title: string;
	export let jsonData: object;

	let copied = false;
	let copyButtonText = 'COPY_JSON';
	$: jsonString = JSON.stringify(jsonData, null, 2);

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(jsonString);
			copied = true;
			copyButtonText = 'COPIED!';
			setTimeout(() => {
				copied = false;
				copyButtonText = 'COPY_JSON';
			}, 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
			copyButtonText = 'FAILED!';
		}
	}
</script>

<div class="json-content">
	<h1>// RAW_DATA: {title}</h1>
	<button on:click={copyToClipboard} class:copied>
		{copyButtonText}
	</button>
	<pre>{jsonString}</pre>
</div>

<style>
	.json-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	h1 {
		margin-top: 0;
	}
	pre {
		max-height: 50vh;
		overflow-y: auto;
		border: 1px solid var(--border);
		background-color: var(--pre-background);
		font-size: 0.8em;
	}
	button {
		align-self: flex-end; /* Align button to the right */
		margin-bottom: -0.5rem; /* Pull it closer to the pre block */
	}
	button.copied {
		background-color: var(--accent-visited);
		color: var(--background);
	}
</style>