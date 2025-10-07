<!-- /var/www/html/wormpilled/src/lib/components/DynamicNavButton.svelte -->
<script lang="ts">
	export let config: any;
	export let active = false;

	const { style } = config;
	const textId = `text-${config.id}`;
	const patternId = `pattern-${config.id}`;
	const filterId = `grayscale-${config.id}`;
</script>

<div class="button-wrapper" class:active>
	<svg width="88" height="31" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<filter id={filterId}>
				<feColorMatrix type="saturate" values="0" />
			</filter>
			{#if style.backgroundImage}
				<pattern id={patternId} patternUnits="userSpaceOnUse" width="88" height="31">
					<image href={style.backgroundImage} x="0" y="0" width="88" height="31" />
				</pattern>
			{/if}
		</defs>

		<!-- Group for elements to be desaturated -->
		<g filter={active ? `url(#${filterId})` : 'none'}>
			<!-- Background -->
			<rect
				x="0"
				y="0"
				width="88"
				height="31"
				fill={style.backgroundImage
					? `url(#${patternId})`
					: active
						? 'var(--background-alt)'
						: style.backgroundColor || 'transparent'}
			/>

			<!-- Text -->
			<text
				id={textId}
				x="44"
				y="15.5"
				fill={active ? 'var(--foreground)' : style.textColor || '#000000'}
				font-family={style.fontFamily || 'monospace'}
				font-size={style.fontSize || 10}
				font-weight={style.fontWeight || 'normal'}
				text-anchor="middle"
				dominant-baseline="central"
			>
				{#if style.textMarquee && !active}
					<animate attributeName="x" from="132" to="-44" dur="5s" repeatCount="indefinite" />
				{/if}
				{#if style.textBlink && !active}
					<animate
						attributeName="opacity"
						values="0;1;1;1;0"
						keyTimes="0;0.2;0.8;0.9;1"
						dur={style.blinkDuration || '1s'}
						repeatCount="indefinite"
					/>
				{/if}
				{config.text}
			</text>
		</g>

		<!-- Border (on top, not affected by filter) -->
		<rect
			class:animated-border={style.animatedBorder}
			x="0"
			y="0"
			width="88"
			height="31"
			fill="none"
			stroke={active ? 'none' : style.borderColor || 'none'}
			stroke-width={style.borderWidth || '1'}
		/>
	</svg>
</div>

<style>
	.button-wrapper {
		display: inline-block;
		width: 88px;
		height: 31px;
		border: none;
		padding: 0;
		background: none;
	}
	.button-wrapper.active {
		opacity: 0.8; /* Make it look a bit more faded */
	}
	svg {
		display: block;
	}
	.animated-border {
		stroke-dasharray: 238; /* 2 * (88 + 31) */
		stroke-dashoffset: 238;
		transition: stroke-dashoffset 0.4s ease-out;
	}
	.button-wrapper:not(.active):hover .animated-border {
		stroke-dashoffset: 0;
	}
</style>