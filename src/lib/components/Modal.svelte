<!-- /var/www/html/wormpilled/src/lib/components/Modal.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';

	export let show = false;

	// When the `show` prop changes, update the body's scroll behavior.
	$: if (browser) {
		if (show) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = ''; // Reverts to the stylesheet's value
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			show = false;
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		// Close modal only if the click is on the backdrop itself, not a child element.
		if (event.currentTarget === event.target) {
			show = false;
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeydown);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeydown);
			// Important: Reset the overflow style when the component is destroyed,
			// in case it's destroyed while the modal is still open (e.g., page navigation).
			document.body.style.overflow = '';
		}
	});
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="modal-backdrop"
		role="button"
		tabindex="0"
		on:click={handleBackdropClick}
		on:keydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') handleBackdropClick(e);
		}}
		transition:fade={{ duration: 150 }}
	>
		<div role="dialog" aria-modal="true" class="modal-content">
			<button class="close-button" on:click={() => (show = false)}>[X]</button>
			<slot />
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}
	.modal-content {
		background-color: var(--background);
		border: 1px solid var(--border);
		padding: 2rem;
		max-width: 80ch;
		width: 90%;
		max-height: 80vh;
		overflow-y: auto;
		position: relative;
	}
	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		font-size: 1.2rem;
		cursor: pointer;
		color: var(--accent);
	}
</style>