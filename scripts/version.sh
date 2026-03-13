#!/bin/bash

# Version Management Script
# Automatically updates version across iOS, Android, and package.json

VERSION_TYPE=$1

if [ -z "$VERSION_TYPE" ]; then
  echo "Usage: ./scripts/version.sh [major|minor|patch]"
  echo "Example: ./scripts/version.sh patch"
  exit 1
fi

# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"

# Update package.json version
npm version $VERSION_TYPE --no-git-tag-version

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")
echo "New version: $NEW_VERSION"

# Update iOS version
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $NEW_VERSION" ios/ProductionArchitectureRN/Info.plist

# Increment iOS build number
CURRENT_BUILD=$(/usr/libexec/PlistBuddy -c "Print :CFBundleVersion" ios/ProductionArchitectureRN/Info.plist)
NEW_BUILD=$((CURRENT_BUILD + 1))
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $NEW_BUILD" ios/ProductionArchitectureRN/Info.plist

echo "Updated to version $NEW_VERSION (Build $NEW_BUILD)"
echo "Ready to commit and tag!"
