#!/bin/bash
# Script to publish the shared package to npm

# Ensure the package is built
npm run build

# Check if user is logged in to npm
if ! npm whoami >/dev/null 2>&1; then
  echo "You are not logged in to npm. Please login first:"
  echo "npm login"
  exit 1
fi

# Ask for confirmation
read -p "Are you sure you want to publish @huddlehub/shared to npm? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # Publish to npm
  npm publish
  echo "Package published successfully!"
else
  echo "Publication cancelled."
fi 