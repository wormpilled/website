so should i use a new cloudflare git instead of the gh-pages in my npm?


old workflow:
- posting to github
- using a github "worker" to build the site to its own branch
- updates my github pages website
- this really sucked and was too hard to work with, using sveltekit


new workflow
- posting to the same repo on github
- cloudflare pages setup that catches updates to here
- will use cloudflare pages website rather than github pages



goals
- no wrangler, i do cloudflare workers editing in the dashboard, but i can keep scripts locally for organization:




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






this script works with them using sveltekit and node
`/var/www/html/wormpilled/scripts/build-posts.js`
@/var/www/html/wormpilled/scripts/build-posts.js


# deplying script
> can use this to trigger the build, push to github (dont worry about triggering CF)

@/var/www/html/wormpilled/deploy.sh

@/var/www/html/wormpilled/package.json

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
@/var/www/html/wormpilled/src/lib/components/CritterCounter.svelte
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
