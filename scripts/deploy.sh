#!/bin/bash

if [[ ! -d "./dist" ]]; then
	echo "./dist doesn not exist"
	echo "Try: npm run build"
	exit 1
fi

aws s3 sync . s3://jacobguinther.com \
	--exclude ".gitignore" \
	--exclude ".git/*" \
	--exclude "README.md" \
	--exclude "src/*" \
	--exclude "*.html" \
	--exclude "*.js" \
	--exclude "scripts/*" \
	--exclude "dist/*" &&
	aws s3 sync ./dist/ s3://jacobguinther.com
