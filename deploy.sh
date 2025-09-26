#!/bin/sh
# /var/www/html/wormpilled/deploy.sh

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Content Syncing Step ---
# Define source and destination directories
OBSIDIAN_VAULT="/home/user/Obsidian/wormpilled"
CONTENT_DIR="./content"
echo "Syncing latest content from Obsidian vault..."

# Create content directory if it doesn't exist
mkdir -p "$CONTENT_DIR/POSTS"
mkdir -p "$CONTENT_DIR/STANDALONE"
mkdir -p "$CONTENT_DIR/UPLOADS"

# Sync posts, standalone pages, and uploads using rsync for efficiency
rsync -av --delete "$OBSIDIAN_VAULT/POSTS/" "$CONTENT_DIR/POSTS/"
rsync -av --delete "$OBSIDIAN_VAULT/STANDALONE/" "$CONTENT_DIR/STANDALONE/"
rsync -av --delete "$OBSIDIAN_VAULT/UPLOADS/" "$CONTENT_DIR/UPLOADS/"

echo "Content synced."

# Run the build process locally to catch any errors before pushing.
# This generates the latest post data from the newly synced content.
echo "Running a local build to ensure everything is correct..."
npm run build

# Add all changes, commit, and push to GitHub.
# This includes the newly synced content and the generated JSON files.
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