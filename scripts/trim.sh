#! /bin/bash

# The purpose of this script is to make file paths look better in address bar
# Removes all .html file extensions and changes '/index' to '/'
# Just make sure to edit metadata for all .html in S3 bucket
if [[ ! -d "../html_js_trimmed" ]] ; then
				mkdir ../html_js_trimmed
fi

if [[ -d "../html_js_trimmed" ]] ; then
				rm -rf ../html_js_trimmed/*
				cp ../*.html ../html_js_trimmed/
				cp ../*.js ../html_js_trimmed/

				cd ../html_js_trimmed

				htmlfiles=(`find ./ -maxdepth 1 -name "*.html"`)
				if [[ ${#htmlfiles[@]} -gt 0 ]]; then
								for file in *.html; do
												mv -- "$file" "${file%%.html}"
								done
				fi

				find . -type f ! -name '*.sh' -exec sed -i '' "s/\.html//" {} +
				find . -type f ! -name '*.sh' -exec sed -i '' "s/\/index/\//" {} +
fi
