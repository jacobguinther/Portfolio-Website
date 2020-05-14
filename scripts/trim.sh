#! /bin/bash

# The purpose of this script is to make file paths look better in address bar
# Removes all .html file extensions and changes '/index' to '/'
# Just make sure to edit metadata for all .html in S3 bucket
if [[ ! -d "./html_js_trimmed" ]] ; then
        mkdir ./html_js_trimmed
fi

if [[ -d "./html_js_trimmed" ]] ; then
        rm -rf ./html_js_trimmed/*
        cp ./*.html ./html_js_trimmed/
        cp ./script.js ./html_js_trimmed/

        cd ./html_js_trimmed

        htmlfiles=(`find ./ -maxdepth 1 -name "*.html"`)
        if [[ ${#htmlfiles[@]} -gt 0 ]]; then
                for file in *.html; do
                        mv -- "$file" "${file%%.html}"
                done
        fi

# TODO: Should check if on mac or linux and conditionally do sed or gsed
# These remove '.html' and 'index' from all files but ignore lines that include '/portfolio/'
# Works on mac with gsed installed with brew
        find . -type f ! -name '*.sh' -exec gsed -i "/\/portfolio\//!s/\.html//" {} +
        find . -type f ! -name '*.sh' -exec gsed -i "/\/portfolio\//!s/\/index/\//" {} +
# 	find . -type f ! -name '*.sh' -exec sed -i '' "s/\.html//" {} +
#       find . -type f ! -name '*.sh' -exec sed -i '' "s/\/index/\//" {} +
fi

echo "Dont forget to edit Portfolio urls that may have gotten removed with this script!"
# href="./portfolio/tesla-website/index.html"
# href="/index.html"
# href="/index"
