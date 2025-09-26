#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Build the project
npm run build

# Deploy to GitHub Pages
# The -d flag specifies the directory to publish.
# SvelteKit with adapter-static outputs to 'build' by default.
npx gh-pages -d build -m "Deploy to gh-pages"