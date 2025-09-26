# blog context
## local-first brutalist blog
alright my code is in a working state now.
the deploy.sh script publishes to gh-pages from my obsidian vault.

Obsidian MD blog file locations:
`/home/user/Obsidian/wormpilled/`

```
user: /Obsidian/wormpilled/
tree
.
├── POSTS
│   ├── ANOTHER_FOLDER
│   │   └── Another Example.md
│   └── MISCELLANEOUS
│       └── New Vault Setup (Obsidian blogging CMS).md
└── UPLOADS
    ├── phone.jpg
    └── troll.png
```

@/home/user/Obsidian/wormpilled/POSTS/MISCELLANEOUS/New Vault Setup (Obsidian blogging CMS).md
@/home/user/Obsidian/wormpilled/POSTS/ANOTHER_FOLDER/Another Example.md


the obsidian vault is configured to have any images i add to any posts, move to the "UPLOADS" folder, any attachments will work like this.
so we can use this as a media/uplods folder on github to serve the graphics on github pages

```
wormpilled.github.io
```
 
# code
@/var/www/html/wormpilled/src/routes/av-test/+page.svelte
@/var/www/html/wormpilled/src/routes/key/+page.svelte
@/var/www/html/wormpilled/src/routes/+layout.svelte
@/var/www/html/wormpilled/src/routes/contact/+page.svelte
@/var/www/html/wormpilled/src/routes/+layout.js
@/var/www/html/wormpilled/src/routes/post/[slug]/+page.js
@/var/www/html/wormpilled/src/routes/post/[slug]/+page.svelte
@/var/www/html/wormpilled/src/routes/standalone/[slug]/+layout.svelte
@/var/www/html/wormpilled/src/routes/standalone/[slug]/+page.js
@/var/www/html/wormpilled/src/routes/standalone/[slug]/+layout.js
@/var/www/html/wormpilled/src/routes/standalone/[slug]/+page.svelte
@/var/www/html/wormpilled/src/routes/standalone/+page.svelte
@/var/www/html/wormpilled/src/routes/+page.svelte
@/var/www/html/wormpilled/src/lib/components/HexClock.svelte
@/var/www/html/wormpilled/src/lib/components/EncryptedChannel.svelte
@/var/www/html/wormpilled/src/lib/components/Breadcrumbs.svelte
@/var/www/html/wormpilled/src/lib/components/BiometricStatus.svelte
@/var/www/html/wormpilled/src/lib/components/SystemLoad.svelte
@/var/www/html/wormpilled/src/lib/components/IncidentCounter.svelte
@/var/www/html/wormpilled/src/lib/components/GeographicSector.svelte
@/var/www/html/wormpilled/src/lib/components/UptimeCounter.svelte
@/var/www/html/wormpilled/src/lib/components/KnownAliases.svelte
@/var/www/html/wormpilled/src/lib/components/SatireBanner.svelte
@/var/www/html/wormpilled/src/lib/components/Webring.svelte
@/var/www/html/wormpilled/src/lib/components/ThemeSwitcher.svelte
@/var/www/html/wormpilled/src/lib/components/Shrine.svelte
@/var/www/html/wormpilled/src/lib/components/Modal.svelte
@/var/www/html/wormpilled/src/lib/components/ConnectionStatus.svelte
@/var/www/html/wormpilled/src/lib/components/SessionLog.svelte
@/var/www/html/wormpilled/src/lib/themes.ts
@/var/www/html/wormpilled/src/lib/index.ts
@/var/www/html/wormpilled/src/app.html
@/var/www/html/wormpilled/src/app.d.ts
@/var/www/html/wormpilled/package.json
@/var/www/html/wormpilled/deploy.sh
@/var/www/html/wormpilled/scripts/build-posts.js

we are going to implement this functionality, i will have to create all new CloudFlare Workers through the dashboard (i do not want to use wrangler CLI)
you will have to explain the process when i need to create new KV stores for example, to setup these CloudFlare Workers Integrations

All dynamic, server-side functionality is managed via a decoupled Cloudflare Workers API.

## Core Principles

-   **Frontend:** The static SvelteKit site on `wormpilled.github.io`.
-   **Backend:** Cloudflare Worker scripts providing API endpoints.
-   **Communication:** Client-side `fetch` calls from the browser.
-   **CORS:** All worker responses **must** include `Access-Control-Allow-Origin: 'https://wormpilled.github.io'` headers to function.

---

## Feature: Visitor Counter (`/api/critters`)
> i use the term 'critters' rather than 'hits' to prevent uBlock from identifying it as a potential analytical tracker to block
-   **Purpose:** Track and display page views in a classic, old-school style.
-   **KV Namespace:** `WORM_HITS`
-   **Methods:**
    -   `GET /api/hits?slug=[post-slug]`: Retrieves the current count without incrementing.
    -   `POST /api/hits` (Body: `{ "slug": "post-slug" }`): Increments the count for the given slug and returns the new value.
-   **Frontend Display:** Asynchronously loads the count. Displays `//ACCESSES: 0x----` while loading, and `//ACCESSES: 0x7BEEF` on success.

### Svelte Client Example
```svelte
<script>
    import { onMount } from 'svelte';
    export let slug;

    let count = '----';
    const apiUrl = 'https://api.wormpilled.workers.dev/api/hits';

    onMount(async () => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: slug })
            });
            const data = await response.json();
            count = '0x' + data.hits.toString(16).toUpperCase().padStart(4, '0');
        } catch (error) {
            console.error("Counter API failed:", error);
            count = '0xDEAD';
        }
    });
</script>

<span>//ACCESSES: {count}</span>```

---

## Feature: "Love" Button

-   **Purpose:** A simple "like" or "thanks" button as a lightweight engagement metric, replacing complex analytics.
-   **Endpoint:** `/api/love`
-   **Action:**
    -   `POST /api/love` (Body: `{ "slug": "post-slug" }`)
-   **Considerations:** Needs rate-limiting to prevent spam.

---

## Feature: Microblog Feed (KV-based)

-   **Purpose:** A "tweet-like" feed that can be updated without a full site rebuild.
-   **Endpoint:** `/api/feed`
-   **Action:**
    -   `GET /api/feed`: Returns the latest microblog entries.
    -   `POST /api/feed`: (Requires authentication) A script would post new entries.
-   **Local Backup:** The script should also store entries locally in case the KV store fails.

---

## Feature: Dystopian Weather (`/api/weather`)

-   **Purpose:** Acts as a cached proxy to a real weather API, transforming the data into a dystopian format.
-   **KV Namespace:** `WORM_CACHE`
-   **Secret Variable:** `WEATHER_API_KEY`
-   **Logic:**
    1.  Check KV for a cached `weather_data` key.
    2.  If found, return it.
    3.  If not found, fetch data from the external weather API.
    4.  Transform the data into the desired format (e.g., `"Clear"` -> `"ATMOSPHERE: NOMINAL"`).
    5.  Store the result in KV with a TTL (e.g., 1 hour).
    6.  Return the data to the client.
