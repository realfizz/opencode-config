#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 BEFORE.png AFTER.png" >&2
  exit 2
fi

before_file=$1
after_file=$2

for file in "$before_file" "$after_file"; do
  if [[ ! -f "$file" ]]; then
    echo "Screenshot not found: $file" >&2
    exit 1
  fi
done

upload_blob() {
  local file=$1
  local output
  local url

  output=$(vercel blob put "$file" --access public --add-random-suffix true --content-type image/png 2>&1) || {
    printf '%s\n' "$output" >&2
    return 1
  }
  url=$(printf '%s\n' "$output" | grep -Eo 'https://[^[:space:]]+\.blob\.vercel-storage\.com[^[:space:]]*' | tail -1)
  [[ -n "$url" ]] || {
    printf '%s\n' "$output" >&2
    echo "Vercel Blob upload returned no public URL" >&2
    return 1
  }
  printf '%s\n' "$url"
}

verify_image_url() {
  local url=$1
  local content_type

  for _ in 1 2 3 4 5; do
    content_type=$(curl -fsSL -o /dev/null -w '%{content_type}' "$url" 2>/dev/null) || content_type=
    [[ "$content_type" == image/* ]] && return 0
    sleep 1
  done

  echo "Upload did not return an image URL: $url ($content_type)" >&2
  return 1
}

[[ -n "${BLOB_READ_WRITE_TOKEN:-}" ]] || {
  echo "BLOB_READ_WRITE_TOKEN is not set; load it from the user's environment before running PR-UI" >&2
  exit 1
}
command -v vercel >/dev/null 2>&1 || {
  echo "Vercel CLI is required; install it before running PR-UI" >&2
  exit 1
}

before_url=$(upload_blob "$before_file")
after_url=$(upload_blob "$after_file")
verify_image_url "$before_url"
verify_image_url "$after_url"

printf '| Before | After |\n|:------:|:-----:|\n| ![Before](%s) | ![After](%s) |\n' "$before_url" "$after_url"
