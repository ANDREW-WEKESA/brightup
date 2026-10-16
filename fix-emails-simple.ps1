# Simple script to fix commit emails
Set-Location "c:\dev\smart mind\brightup"

Write-Host "Fixing commit emails..." -ForegroundColor Cyan

# Suppress warning
$env:FILTER_BRANCH_SQUELCH_WARNING = "1"

# Create backup
git branch backup-fix -f

# The commit before today's work
$baseCommit = "a6295b0"

# Remove old refs if they exist
if (Test-Path ".git/refs/original") {
    Remove-Item -Recurse -Force ".git/refs/original"
}

# Build the filter command
$filterCmd = 'if [ "$GIT_COMMITTER_EMAIL" = "andrew@brightup.local" ]; then export GIT_COMMITTER_EMAIL="ANDREW-WEKESA@users.noreply.github.com"; export GIT_COMMITTER_NAME="Andrew Wekesa"; fi; if [ "$GIT_AUTHOR_EMAIL" = "andrew@brightup.local" ]; then export GIT_AUTHOR_EMAIL="ANDREW-WEKESA@users.noreply.github.com"; export GIT_AUTHOR_NAME="Andrew Wekesa"; fi'

# Run filter-branch
Write-Host "Running git filter-branch..." -ForegroundColor Yellow
git filter-branch --force --env-filter $filterCmd --tag-name-filter cat -- "$baseCommit..HEAD"

# Verify
Write-Host "`nVerifying..." -ForegroundColor Cyan
git log --format="%ae" -n 5

Write-Host "`nDone! Now run: git push origin main --force" -ForegroundColor Green
