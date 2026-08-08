#!/bin/bash
# Zera Dental — push the Next.js security patch (15.1.6 → 15.5.23)
set -e
cd "$(dirname "$0")"
echo "→ Working in: $(pwd)"
git add -A
git -c user.name="Zera Technologies" -c user.email="hello@zeratech.io" \
    commit -q -m "Bump Next.js to 15.5.23 (security patch required by Vercel)"
git push
echo
echo "✅ Pushed. Vercel will rebuild automatically."
