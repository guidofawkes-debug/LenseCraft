#!/bin/bash

# Create a tmp directory for the archive
mkdir -p tmp/the-lense-shop

# Copy all project files to tmp directory
# (excluding node_modules, .git, etc.)
echo "Copying project files..."
rsync -av --progress ./ tmp/the-lense-shop \
  --exclude node_modules \
  --exclude .git \
  --exclude tmp \
  --exclude .replit \
  --exclude .upm \
  --exclude .config

# Create the archive
echo "Creating ZIP archive..."
cd tmp
zip -r ../the-lense-shop.zip the-lense-shop

# Cleanup
echo "Cleaning up..."
cd ..
rm -rf tmp

echo "Archive created: the-lense-shop.zip"
echo "You can download this file to get a complete copy of the project."