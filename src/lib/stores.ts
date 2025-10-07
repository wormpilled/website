// /var/www/html/wormpilled/src/lib/stores.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/** True when the user has scrolled past the main header's height. */
export const isScrolledPastHeader = writable(false);

/** Controls the visibility of the sticky header, implementing the "show on scroll up" pattern. */
export const showStickyHeader = writable(true);

// --- User Data Store ---
const defaultUserData = {
	exp: 0,
	savedItems: [] as any[]
};

function createUserDataStore() {
	const { subscribe, set, update } = writable(defaultUserData);

	// Load from localStorage only on the client side
	if (browser) {
		const storedData = localStorage.getItem('userData');
		if (storedData) {
			set(JSON.parse(storedData));
		}
	}

	// Subscribe to changes and save to localStorage
	subscribe((value) => {
		if (browser) {
			localStorage.setItem('userData', JSON.stringify(value));
		}
	});

	return {
		subscribe,
		incrementExp: () => {
			update((data) => {
				data.exp += 1;
				return data;
			});
		},
		saveItem: (item: any) => {
			update((data) => {
				// Avoid duplicates based on the item's link
				if (!data.savedItems.some((i) => i.link === item.link)) {
					data.savedItems.push(item);
				}
				return data;
			});
		},
		removeSavedItem: (itemLink: string) => {
			update((data) => {
				data.savedItems = data.savedItems.filter((i) => i.link !== itemLink);
				return data;
			});
		}
	};
}

export const userData = createUserDataStore();

// --- Takeover Store ---
/**
 * Manages content takeover for modals.
 * When a component is set, the main content area is replaced.
 * The value should be an object: { component: SvelteComponent, props: object } or null.
 */
export const takeover = writable<any>(null);

export function showTakeover(component: any, props: object = {}) {
	takeover.set({ component, props });
}

export function hideTakeover() {
	takeover.set(null);
}