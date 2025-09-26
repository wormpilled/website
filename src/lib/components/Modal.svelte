<!-- /var/www/html/wormpilled/src/lib/components/Modal.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';

	export let show = false;

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
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
		}
	});
</script>

{#if show}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="modal-backdrop"
		role="button"
		tabindex="0"
		on:click={() => (show = false)}
		on:keydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') show = false;
		}}
		transition:fade={{ duration: 150 }}
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div role="dialog" aria-modal="true" class="modal-content" on:click|stopPropagation>
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
