#!/usr/bin/env sh

git add --all
git commit -m 'linking local for resting'

npm run build-all
npm version minor
npm link
