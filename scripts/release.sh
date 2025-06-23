#!/bin/bash

RED='\033[0;31m'
NC='\033[0m' # No Color

if [ -z "$1" ]; then
  echo "${RED}No release type specified.${NC}"
  echo ""
  echo "Usage: npm run release -- [type]"
  echo ""
  echo "Where [type] can be:"
  echo "  major       - Increment the major version (e.g., 1.0.0 → 2.0.0)"
  echo "  minor       - Increment the minor version (e.g., 1.0.0 → 1.1.0)"
  echo "  patch       - Increment the patch version (e.g., 1.0.0 → 1.0.1)"
  echo "  rc          - Increment the pre-release version (e.g., 1.0.0 → 1.0.1-rc.0 or 1.0.1-rc.0 → 1.0.1-rc.1)"
  echo "  rc:major    - Create or increment pre-release major with rc (e.g., 1.0.0 → 2.0.0-rc.0)"
  echo "  rc:minor    - Create or increment pre-release minor with rc (e.g., 1.0.0 → 1.1.0-rc.0)"
  echo "  rc:patch    - Create or increment pre-release patch with rc (e.g., 1.0.0 → 1.0.1-rc.0)"
  exit 1
fi

case $1 in
  patch)
    npm version patch -m "chore(release): %s"
    ;;
  minor)
    npm version minor -m "chore(release): %s"
    ;;
  major)
    npm version major -m "chore(release): %s"
    ;;
  rc)
    npm version prerelease --preid=rc -m "chore(release): %s"
    ;;
  rc:patch)
    npm version prepatch --preid=rc -m "chore(release): %s"
    ;;
  rc:minor)
    npm version preminor --preid=rc -m "chore(release): %s"
    ;;
  rc:major)
    npm version premajor --preid=rc -m "chore(release): %s"
    ;;
  *)
    echo -e "${RED}Unknown release type: $1${NC}"
    exit 1
    ;;
esac
