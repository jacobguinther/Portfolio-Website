#!/bin/bash

aws s3 sync ./html_js_trimmed/ s3://jacobguinther.com \
  --exclude "*.js" \
  --content-type 'text/html' \
  --metadata-directive REPLACE && \

aws cloudfront create-invalidation \
  --distribution-id E2PT0ELPPIN6ZK --paths "/404" "/contact" "/index" "/portfolio" "/success"


