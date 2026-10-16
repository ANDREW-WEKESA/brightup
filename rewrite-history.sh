#!/bin/bash
# Script to rewrite commit history with correct email

cd "/c/dev/smart mind/brightup"

echo "🔧 Rewriting commit history..."

# Find the base commit (last commit before today)
BASE_COMMIT=$(git log --oneline --reverse --since="2026-10-19" | head -1 | cut -d' ' -f1)
PARENT_COMMIT=$(git rev-parse ${BASE_COMMIT}^)

echo "Base commit: $PARENT_COMMIT"
echo "Rewriting commits from $BASE_COMMIT onwards..."

# Use git filter-branch to rewrite
export FILTER_BRANCH_SQUELCH_WARNING=1

git filter-branch --force --env-filter '
OLD_EMAIL="andrew@brightup.local"
CORRECT_EMAIL="ANDREW-WEKESA@users.noreply.github.com"
CORRECT_NAME="Andrew Wekesa"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- $PARENT_COMMIT..HEAD

echo "✅ History rewritten!"
echo "📊 Verifying..."
git log --format="%ae %s" -n 5

echo ""
echo "⚠️  To apply changes to GitHub, run:"
echo "git push origin main --force"
