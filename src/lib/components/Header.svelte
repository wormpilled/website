<!-- /var/www/html/wormpilled/src/lib/components/Header.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import DynamicNavButton from '$lib/components/DynamicNavButton.svelte';
	import ConfigModal from '$lib/components/ConfigModal.svelte';
	import UserStatsModal from '$lib/components/UserStatsModal.svelte';
	import SavedItemsModal from '$lib/components/SavedItemsModal.svelte';
	import PlanViewer from '$lib/components/PlanViewer.svelte';
	import navButtons from '$lib/data/dynamic_nav_buttons.json';
	import { userData, showTakeover, takeover } from '$lib/stores';

	let planContent = 'Loading...';

	// Whimsy map for category titles
	const categoryDisplay = {
		SYSTEM: '⚙️ SYSTEM',
		CONTENT: '🗂️ CONTENT',
		EXTERNAL: '🌐 EXTERNAL'
	};

	// Group buttons by category
	const groupedNavButtons = navButtons.reduce((acc, button) => {
		const category = button.category || 'UNCATEGORIZED';
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(button);
		return acc;
	}, {});

	// Define category order
	const categoryOrder = ['CONTENT', 'SYSTEM', 'EXTERNAL'];
	const sortedGroupedNavButtons = Object.fromEntries(
		Object.entries(groupedNavButtons).sort(
			([a], [b]) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
		)
	);

	async function fetchPlan() {
		try {
			const response = await fetch('/plan.txt');
			if (response.ok) {
				planContent = await response.text();
			} else {
				planContent = 'Error: Could not load plan file.';
			}
		} catch (error) {
			planContent = 'Error: Could not fetch plan file.';
		}
	}

	function handleButtonClick(action?: string) {
		if (action === 'open_plan_modal') {
			fetchPlan().then(() => {
				showTakeover(PlanViewer, { content: planContent });
			});
		} else if (action === 'open_config_modal') {
			showTakeover(ConfigModal);
		} else if (action === 'open_stats_modal') {
			showTakeover(UserStatsModal);
		} else if (action === 'open_saved_modal') {
			showTakeover(SavedItemsModal);
		}
	}
</script>

<header id="main-header">
	<div class="header-content">
		<a href="/" class="logo-link" aria-label="Back to Homepage">
			<svg
				viewBox="0 0 450 70"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMinYMid meet"
			>
				<defs>
					<filter id="logo-glow">
						<feGaussianBlur stdDeviation="1.5" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>
				<g>
					<g filter="url(#logo-glow)">
						<g>
							<!-- Worm Body Segments -->
							<rect x="10" y="25" width="15" height="15" fill="var(--accent)">
								<animate
									attributeName="y"
									values="25;20;25"
									dur="1s"
									repeatCount="indefinite"
									begin="0.3s"
								/>
								<animate
									attributeName="fill"
									values="var(--accent); var(--accent-visited); #ffb6c1; var(--accent)"
									dur="6s"
									repeatCount="indefinite"
									begin="0.3s"
								/>
							</rect>
							<rect x="25" y="25" width="15" height="15" fill="var(--accent)">
								<animate
									attributeName="y"
									values="25;20;25"
									dur="1s"
									repeatCount="indefinite"
									begin="0.2s"
								/>
								<animate
									attributeName="fill"
									values="var(--accent); var(--accent-visited); #ffb6c1; var(--accent)"
									dur="6s"
									repeatCount="indefinite"
									begin="0.2s"
								/>
							</rect>
							<rect x="40" y="25" width="15" height="15" fill="var(--accent)">
								<animate
									attributeName="y"
									values="25;20;25"
									dur="1s"
									repeatCount="indefinite"
									begin="0.1s"
								/>
								<animate
									attributeName="fill"
									values="var(--accent); var(--accent-visited); #ffb6c1; var(--accent)"
									dur="6s"
									repeatCount="indefinite"
									begin="0.1s"
								/>
							</rect>
							<rect x="55" y="25" width="15" height="15" fill="var(--accent)">
								<animate
									attributeName="y"
									values="25;20;25"
									dur="1s"
									repeatCount="indefinite"
									begin="0s"
								/>
								<animate
									attributeName="fill"
									values="var(--accent); var(--accent-visited); #ffb6c1; var(--accent)"
									dur="6s"
									repeatCount="indefinite"
									begin="0s"
								/>
							</rect>
						</g>

						<!-- Animated Face -->
						<g>
							<animateTransform
								attributeName="transform"
								type="translate"
								values="45 0; 45 -5; 45 0"
								dur="1s"
								repeatCount="indefinite"
								begin="0s"
							/>
							<!-- Eyes -->
							<circle cx="15" cy="32" r="1" fill="var(--background)">
								<animate
									attributeName="ry"
									values="1;1;1;0;1"
									dur="4s"
									repeatCount="indefinite"
									begin="0.5s"
								/>
							</circle>
							<circle cx="20" cy="32" r="1" fill="var(--background)">
								<animate
									attributeName="ry"
									values="1;1;1;0;1"
									dur="4s"
									repeatCount="indefinite"
									begin="0.5s"
								/>
							</circle>
							<!-- Mouth -->
							<path
								d="M 15 36 Q 17.5 38 20 36"
								stroke="var(--background)"
								stroke-width="1"
								fill="none"
							/>
						</g>

						<!-- Text -->
						<text
							x="80"
							y="36"
							dominant-baseline="middle"
							font-size="24"
							fill="var(--accent)"
							font-family="monospace">[WORM.....PILLED]</text
						>
					</g>
					<!-- Subtitle -->
					<text
						x="80"
						y="55"
						dominant-baseline="middle"
						font-size="12"
						fill="var(--foreground)"
						font-family="monospace"
					>
						// a local-first brutalist blog
						<animate
							attributeName="opacity"
							values="1;1;1;0.5;1;1"
							dur="7s"
							repeatCount="indefinite"
						/>
					</text>
				</g>
			</svg>
		</a>

		<div class="nav-break"></div>

		<div class="nav-wrapper">
			<nav class="nav-full">
				{#each Object.entries(sortedGroupedNavButtons) as [category, buttons]}
					<div class="nav-category">
						<p class="nav-category-title">{categoryDisplay[category] || `// ${category}`}</p>
						<div class="nav-category-buttons">
							{#each buttons as buttonConfig}
								<!-- Conditional Rendering Logic -->
								{#if buttonConfig.id === 'saved' && $userData.savedItems.length === 0}
									<!-- Do not render the saved button if there are no items -->
								{:else if buttonConfig.isDynamic}
									<!-- RENDER DYNAMIC SVG BUTTON -->
									{#if buttonConfig.type === 'link'}
										{@const isActive =
											$page.url.pathname === buttonConfig.url ||
											($page.url.pathname.startsWith(buttonConfig.url) && buttonConfig.url !== '/')}
										<a
											class="dynamic-nav-link"
											class:active={isActive}
											href={buttonConfig.url}
											target={buttonConfig.isExternal ? '_blank' : undefined}
											rel={buttonConfig.isExternal ? 'noopener noreferrer' : undefined}
										>
											<DynamicNavButton config={buttonConfig} active={isActive} />
										</a>
									{:else if buttonConfig.type === 'button'}
										{@const isActive =
											(buttonConfig.action === 'open_plan_modal' && $takeover?.component === PlanViewer) ||
											(buttonConfig.action === 'open_config_modal' &&
												$takeover?.component === ConfigModal) ||
											(buttonConfig.action === 'open_stats_modal' &&
												$takeover?.component === UserStatsModal) ||
											(buttonConfig.action === 'open_saved_modal' &&
												$takeover?.component === SavedItemsModal)}
										<button
											on:click={() => handleButtonClick(buttonConfig.action)}
											class:active={isActive}
											class:no-global-hover={true}
										>
											<DynamicNavButton config={buttonConfig} active={isActive} />
										</button>
									{/if}
								{:else}
									<!-- RENDER PLAIN TEXT LINK/BUTTON -->
									{#if buttonConfig.type === 'link'}
										{@const isActive =
											$page.url.pathname === buttonConfig.url ||
											($page.url.pathname.startsWith(buttonConfig.url) && buttonConfig.url !== '/')}
										<a href={buttonConfig.url} class="plain-nav-link" class:active={isActive}>
											{buttonConfig.text}
										</a>
									{:else if buttonConfig.type === 'button'}
										{@const isActive =
											buttonConfig.action === 'open_config_modal' && $takeover?.component === ConfigModal}
										<button
											on:click={() => handleButtonClick(buttonConfig.action)}
											class="plain-nav-link"
											class:active={isActive}
										>
											{buttonConfig.text}
										</button>
									{/if}
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</nav>
		</div>
	</div>
</header>

<style>
	header {
		padding: 0.5rem 0;
		height: var(--header-height);
	}

	.header-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.logo-link {
		flex-shrink: 0;
	}

	.logo-link svg {
		height: 80px;
		width: 100%;
		min-width: 350px;
		display: block;
	}

	.nav-break {
		flex-basis: 100%;
		height: 0;
	}

	.nav-wrapper {
		flex-basis: 100%;
		display: flex;
		justify-content: flex-start;
	}

	.nav-full {
		display: flex;
		align-items: stretch;
		gap: 0.5rem;
	}

	.nav-category {
		padding: 0.3rem;
		display: flex;
		flex-direction: column;
	}

	.nav-category:not(:first-child) {
		margin-left: 0.5rem;
		padding-left: 1rem;
		border-left: 2px dotted var(--accent);
	}

	.nav-category-title {
		margin: 0;
		padding: 0 0.2rem 0.2rem 0.2rem;
		font-size: 0.8em;
		color: var(--accent);
		border-bottom: 1px dashed var(--border);
		text-align: left;
	}
	.nav-category-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 8px;
		align-items: center;
		padding-top: 0.3rem;
		flex-grow: 1;
	}

	.nav-full button {
		padding: 0;
		border: none;
		background: none;
		line-height: 0;
	}

	.nav-full button.no-global-hover:hover,
	.nav-full button.no-global-hover:focus {
		background-color: transparent;
		outline: none;
	}

	a.dynamic-nav-link:hover {
		background-color: transparent;
		text-decoration: none;
	}

	.dynamic-nav-link.active,
	.nav-full button.active {
		pointer-events: none;
	}

	/* Styling for plain text links */
	.plain-nav-link {
		font-family: 'SF Mono', 'Consolas', 'Menlo', monospace;
		color: #aaa;
		font-size: 0.9em;
		padding: 0.2em 0.4em;
		border: 1px solid transparent;
		font-weight: normal;
	}
	.plain-nav-link:hover {
		color: var(--accent);
		background-color: transparent;
		text-decoration: underline;
	}
	.plain-nav-link.active {
		color: var(--foreground);
		font-weight: bold;
	}
</style>