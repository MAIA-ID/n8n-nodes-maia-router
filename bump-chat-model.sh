#!/bin/sh
# Bump version for chat-model package
# Usage: ./bump-chat-model.sh [major|minor|patch]

set -e

if [ $# -ne 1 ]; then
  echo "Usage: $0 [major|minor|patch]"
  exit 1
fi

BUMP_TYPE=$1
if [ "$BUMP_TYPE" != "major" ] && [ "$BUMP_TYPE" != "minor" ] && [ "$BUMP_TYPE" != "patch" ]; then
  echo "Invalid argument: $BUMP_TYPE. Use major, minor, or patch."
  exit 1
fi

PACKAGE_DIR="packages/chat-model"
PKG_FILE="$PACKAGE_DIR/package.json"

if [ ! -f "$PKG_FILE" ]; then
  echo "Error: $PKG_FILE not found"
  exit 1
fi

if command -v jq >/dev/null 2>&1; then
  OLD_VERSION=$(jq -r .version $PKG_FILE)
else
  OLD_VERSION=$(grep '"version"' $PKG_FILE | head -1 | sed -E 's/.*"([0-9]+\.[0-9]+\.[0-9]+)".*/\1/')
fi

IFS='.' read -r MAJOR MINOR PATCH <<EOF
$OLD_VERSION
EOF

case $BUMP_TYPE in
  major)
    MAJOR=$((MAJOR+1))
    MINOR=0
    PATCH=0
    ;;
  minor)
    MINOR=$((MINOR+1))
    PATCH=0
    ;;
  patch)
    PATCH=$((PATCH+1))
    ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"

echo "Package: chat-model"
echo "Current version: $OLD_VERSION"
echo "Bumping version type: $BUMP_TYPE"
echo "New version: $NEW_VERSION"

if command -v jq >/dev/null 2>&1; then
  tmpfile=$(mktemp)
  jq --arg v "$NEW_VERSION" '.version = $v' $PKG_FILE > "$tmpfile" && mv "$tmpfile" $PKG_FILE
else
  if sed --version 2>/dev/null | grep -q GNU; then
    sed -i -E "s/(\"version\":\s*)\"[0-9]+\.[0-9]+\.[0-9]+\"/\1\"$NEW_VERSION\"/" $PKG_FILE
  else
    sed -i '' -E "s/(\"version\":\s*)\"[0-9]+\.[0-9]+\.[0-9]+\"/\1\"$NEW_VERSION\"/" $PKG_FILE
  fi
fi

echo "Version bumped: $OLD_VERSION -> $NEW_VERSION"

echo "Staging and committing version bump..."
git add $PKG_FILE
git commit -m "chore(chat-model): bump version to $NEW_VERSION"

echo "Creating git tag and pushing..."
TAG_NAME="maia-router-v$NEW_VERSION"
git tag $TAG_NAME
git push origin main
git push origin $TAG_NAME

echo "Done! Tag $TAG_NAME pushed. GitHub Actions will publish the package."
