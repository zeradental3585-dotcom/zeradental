#!/bin/bash
# Zera Dental — push pending changes to GitHub (Vercel rebuilds automatically)
set -e
cd "$(dirname "$0")"
echo "→ Working in: $(pwd)"
git add -A
git -c user.name="Zera Technologies" -c user.email="hello@zeratech.io" \
    commit -q -m "${1:-Add Google Analytics 4 (G-HXC70K3RGX)}"
git push
echo
echo "✅ Pushed. Vercel is rebuilding — live in about a minute."
