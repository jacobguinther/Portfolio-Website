#! /bin/bash

# The purpose of this script is to make file paths look better in address bar
# Removes all .html file extensions and changes '/index' to '/'
# Just make sure to edit metadata for all .html in S3 bucket
if [[ ! -d "./dist" ]] ; then
        mkdir ./dist
fi

if [[ -d "./dist" ]] ; then
        rm -rf ./dist/*
        cp ./*.html ./dist/
        cp ./script.js ./dist/

        cd ./dist

        htmlfiles=(`find ./ -maxdepth 1 -name "*.html"`)
        if [[ ${#htmlfiles[@]} -gt 0 ]]; then
                for file in *.html; do
                        mv -- "$file" "${file%%.html}"
                done
        fi

# TODO: Should check if on mac or linux and conditionally do sed or gsed
# These remove '.html' and 'index' from all files
# Works on mac with gsed installed with brew
        find . -type f ! -name '*.sh' -exec gsed -i "s/\.html//" {} +
        find . -type f ! -name '*.sh' -exec gsed -i "s/\/index/\//" {} +
fi
