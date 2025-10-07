<!-- /var/www/html/wormpilled/src/lib/components/SystemStatus.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { getWidgetStyle } from '$lib/widgetStyler';

	// --- From UptimeCounter ---
	const systemStartDate = new Date('1988-08-08T08:08:08Z');
	let sysUptime = '----d --h --m --s';

	// --- From IncidentCounter ---
	const incidentStartDate = new Date('2024-01-01T00:00:00Z');
	let incidentFree = '----d --h --m --s';

	// --- From SystemLoad ---
	let coreLoad = '[--%] [--%] [--%]';

	// --- From HexClock ---
	let localTime = '#--:--:--';

	// --- Static values ---
	const bioSig = 'HR 62 BPM / TEMP 36.8C / STATUS: STABLE';
	const network = 'SECURE_TUNNEL_ACTIVE [AES-256]';
	const aka = ['carrot', 'synthex', '0xDEADBEEF'];

	let styleString = '';

	function formatTime(ms: number) {
		const totalSeconds = Math.floor(ms / 1000);
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		return `${String(days).padStart(4, ' ')}d ${String(hours).padStart(2, '0')}h ${String(
			minutes
		).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
	}

	function updateAll() {
		const now = new Date();

		// Uptime
		const uptimeDiff = now.getTime() - systemStartDate.getTime();
		sysUptime = formatTime(uptimeDiff);

		// Incident
		const incidentDiff = now.getTime() - incidentStartDate.getTime();
		incidentFree = formatTime(incidentDiff);

		// Clock
		const hours = now.getHours().toString(16).toUpperCase().padStart(2, '0');
		const minutes = now.getMinutes().toString(16).toUpperCase().padStart(2, '0');
		const seconds = now.getSeconds().toString(16).toUpperCase().padStart(2, '0');
		localTime = `#${hours}:${minutes}:${seconds}`;

		requestAnimationFrame(updateAll);
	}

	onMount(() => {
		// Core Load (one-time)
		const load1 = Math.floor(Math.random() * 100);
		const load2 = Math.floor(Math.random() * 100);
		const load3 = Math.floor(Math.random() * 100);
		coreLoad = `[${load1}%] [${load2}%] [${load3}%]`;

		const theme = document.documentElement.getAttribute('data-theme') || 'wormpilled';
		styleString = getWidgetStyle('SystemStatus', theme);

		// Start animation frame loop
		const animationFrame = requestAnimationFrame(updateAll);
		return () => cancelAnimationFrame(animationFrame);
	});
</script>

<div class="widget" style={styleString}>
	<p class="title">//SYS_STATUS</p>
	<pre>
{`{
  "SYS_ONLINE_FOR": "${sysUptime}",
  "INCIDENT_FREE_FOR": "${incidentFree}",
  "CORE_LOAD": "${coreLoad}",
  "LOCAL_TIME": "${localTime}",
  "BIO_SIG": "${bioSig}",
  "NETWORK": "${network}",
  "AKA": ${JSON.stringify(aka)}
}`}
	</pre>
</div>

<style>
	.widget {
		background-color: var(--widget-background-color);
	}
	.title {
		border-bottom: var(--widget-title-border-bottom);
		padding-bottom: 0.3em;
		margin-bottom: 0.5rem;
		color: var(--widget-title-color);
	}
	pre {
		font-size: 0.8em;
		background-color: transparent;
		padding: 0;
		margin: 0;
		white-space: pre-wrap;
		word-break: break-all;
		line-height: 1.4;
		color: var(--widget-paragraph-color);
	}
</style>