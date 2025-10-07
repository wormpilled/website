// /var/www/html/wormpilled/src/lib/widgetStyler.ts
import widgetStyles from '$lib/data/widgetStyles.json';

export function getWidgetStyle(name: string, theme: string): string {
	const styles = widgetStyles[name] || widgetStyles.default;
	const currentTheme = theme || 'wormpilled';

	const themeSpecificBg =
		styles.themes?.[currentTheme]?.widget?.['background-color'] ||
		widgetStyles.default.themes[currentTheme].widget['background-color'];

	const cssVars = {
		'--widget-background-color': themeSpecificBg,
		'--widget-title-color': styles.title.color,
		'--widget-paragraph-color': styles.paragraph.color,
		'--widget-title-border-bottom': styles.title['border-bottom']
	};

	return Object.entries(cssVars)
		.map(([key, value]) => `${key}: ${value};`)
		.join(' ');
}