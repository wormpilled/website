<!-- /var/www/html/wormpilled/src/lib/components/ShareModal.svelte -->
<script lang="ts">
	export let title: string;
	export let url: string;

	let copied = false;
	let copyButtonText = 'COPY_LINK';

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(url);
			copied = true;
			copyButtonText = 'COPIED!';
			setTimeout(() => {
				copied = false;
				copyButtonText = 'COPY_LINK';
			}, 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
			copyButtonText = 'FAILED!';
		}
	}
</script>

<div class="share-content">
	<h1>// SHARE_TRANSMISSION</h1>
	<p class="post-title">{title}</p>
	<div class="url-container">
		<input type="text" readonly value={url} />
		<button on:click={copyToClipboard} class:copied>
			{copyButtonText}
		</button>
	</div>
</div>

<style>
	.share-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.post-title {
		font-size: 1.2em;
		color: var(--accent);
		border-top: 1px dashed var(--border);
		border-bottom: 1px dashed var(--border);
		padding: 1rem 0;
		text-align: center;
	}
	.url-container {
		display: flex;
		gap: 0.5rem;
	}
	input[type='text'] {
		flex-grow: 1;
		background-color: var(--pre-background);
		border: 1px solid var(--border);
		color: var(--foreground);
		padding: 0.5rem;
		font-family: inherit;
		font-size: 0.9em;
		min-width: 0;
	}
	button {
		flex-shrink: 0;
		width: 120px;
	}
	button.copied {
		background-color: var(--accent-visited);
		color: var(--background);
	}
</style>