#!/bin/bash
# Script to set up and build the shared package

# Install dependencies
npm install

# Build the package
npm run build

# Create a symlink to make it available locally
npm link

echo "Shared package built and linked locally. To use it in other services, run:"
echo "cd ../your-service-directory && npm link @huddlehub/shared" 

# Uncomment below to publish to npm registry
# echo -e "\n=== Publishing to npm ==="
# echo "To publish to npm, run the following commands:"
# echo "1. Make sure you're logged in: npm login"
# echo "2. Publish the package: npm publish"
# echo "   (or for a specific tag: npm publish --tag beta)" 