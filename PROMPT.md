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

@/home/user/Obsidian/wormpilled/Features - CloudFlare Workers.md
@/home/user/Obsidian/wormpilled/Features - Implementation Tiers.md
@/home/user/Obsidian/wormpilled/Features - Details.md

# code

