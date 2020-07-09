#!/bin/bash

aws s3 sync ./dist/ s3://jacobguinther.com \
	--exclude "*.js" \
	--exclude "*.css" \
	--content-type 'text/html' \
	--metadata-directive REPLACE \
	--dryrun