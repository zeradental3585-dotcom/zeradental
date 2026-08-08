#!/bin/bash
# Zera Dental — one-time push to GitHub
# Run this from inside the zeradental folder:  bash push-to-github.sh

set -e
REPO="https://github.com/zeradental3585-dotcom/zeradental.git"

cd "$(dirname "$0")"
echo "→ Working in: $(pwd)"

rm -rf .git
git init -q
git add -A
git -c user.name="Zera Technologies" -c user.email="hello@zeratech.io" \
    commit -q -m "Zera Dental: SEO-first lead generation site for Indian dental clinics"
git branch -M main
git remote add origin "$REPO"

echo
echo "→ Pushing to $REPO"
echo "  (GitHub will ask you to sign in the first time — a browser window opens,"
echo "   or you paste a Personal Access Token as the password.)"
echo
git push -u origin main

echo
echo "✅ Done. Repo: https://github.com/zeradental3585-dotcom/zeradental"
echo "   Next: import it at https://vercel.com/new"
