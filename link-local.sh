#!/usr/bin/env sh

git add --all
git commit -m "$1"

npm run build-all
npm version minor
npm link
