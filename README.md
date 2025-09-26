# wormpilled

A local-first brutalist blog.

## Content Management

Content is managed locally in an Obsidian vault at `/home/user/Obsidian/wormpilled/`.

-   Posts are written in Markdown files inside the `POSTS` directory.
-   Media (images, etc.) should be placed in the `UPLOADS` directory. The build process will automatically handle linking and copying them to the website.
-   Use YAML frontmatter to define post metadata. Required fields are `title`, `description`, and `date`. Add `draft: true` to prevent a post from being published.

## Developing

First, install dependencies:
```bash
npm install