#!/bin/bash  

if [[ ! -d "./html_js_trimmed" ]] ; then
				echo "./html_js_trimmed doesn not exist"
				echo "Try: npm run build"
				exit 1
fi

aws s3 sync . s3://jacobguinther.com \
				--exclude "sass/*" \
				--exclude ".git/*" \
				--exclude ".gitignore" \
				--exclude "README.md" \
        --exclude "*.html" \
        --exclude "*.js" \
				--exclude "scripts/*" \
				--exclude "html_js_trimmed/*" && \
aws s3 sync ./html_js_trimmed/ s3://jacobguinther.com
