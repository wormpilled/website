<!-- /var/www/html/wormpilled/src/lib/components/ThemeSwitcher.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { themes } from '$lib/themes';

	let currentTheme: string;

	onMount(() => {
		currentTheme = document.documentElement.getAttribute('data-theme') || 'wormpilled';
	});

	function switchTheme(themeName: string) {
		document.documentElement.setAttribute('data-theme', themeName);
		localStorage.setItem('theme', themeName);
		currentTheme = themeName;
	}

	const themeNames = Object.keys(themes);

	function getNextTheme() {
		const currentIndex = themeNames.indexOf(currentTheme);
		const nextIndex = (currentIndex + 1) % themeNames.length;
		return themeNames[nextIndex];
	}

	function cycleTheme() {
		switchTheme(getNextTheme());
	}
</script>

<li>
	<button on:click={cycleTheme}>
		//SWITCH_THEME [{themes[currentTheme]?.name || 'loading'}]
	</button>
</li>
