#!/bin/sh
# /var/www/html/wormpilled/deploy.sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Run the build process locally to catch any errors before pushing.
# This also generates the latest post data from your Obsidian vault.
echo "Running a local build to ensure everything is correct..."
npm run build

# Add all changes, commit, and push to GitHub.
echo "Adding changes to git..."
git add -A

# Commit changes. Use a default message if none is provided.
MSG="$1"
if [ -z "$1" ]; then
  MSG="chore: content and site update"
fi
git commit -m "$MSG"

echo "Pushing to GitHub..."
git push

echo "Deployment pushed to GitHub. Cloudflare will now build and deploy."