# PowerShell script to fix commit emails
# This will rewrite the last 38 commits with the correct email

$ErrorActionPreference = "Stop"
Set-Location "c:\dev\smart mind\brightup"

Write-Host "🔧 Fixing commit emails for GitHub contributions..." -ForegroundColor Cyan

# Use git filter-repo if available, otherwise use filter-branch
$commitCount = 38

Write-Host "📝 Rewriting last $commitCount commits..." -ForegroundColor Yellow

# Set environment variable to suppress warning
$env:FILTER_BRANCH_SQUELCH_WARNING = "1"

# Run git filter-branch
$filterScript = @"
if [ "`$GIT_AUTHOR_EMAIL" = "andrew@brightup.local" ]; then
    export GIT_AUTHOR_EMAIL="ANDREW-WEKESA@users.noreply.github.com"
    export GIT_AUTHOR_NAME="Andrew Wekesa"
    export GIT_COMMITTER_EMAIL="ANDREW-WEKESA@users.noreply.github.com"
    export GIT_COMMITTER_NAME="Andrew Wekesa"
fi
"@

try {
    # Backup current branch
    Write-Host "📦 Creating backup..." -ForegroundColor Yellow
    git branch backup-before-rewrite -f
    
    # Rewrite history
    Write-Host "✍️ Rewriting commit history..." -ForegroundColor Yellow
    git filter-branch --force --env-filter $filterScript HEAD~$commitCount..HEAD
    
    Write-Host "✅ Commits rewritten successfully!" -ForegroundColor Green
    
    # Verify
    Write-Host "`n📊 Checking updated commits..." -ForegroundColor Cyan
    $emails = git log --format="%ae" -n 5
    Write-Host "Recent commit emails:"
    $emails | ForEach-Object { Write-Host "  $_" }
    
    Write-Host "`n⚠️  IMPORTANT: You need to force push!" -ForegroundColor Yellow
    Write-Host "Run: git push origin main --force`n" -ForegroundColor White
    
} catch {
    Write-Host "❌ Error occurred: $_" -ForegroundColor Red
    Write-Host "Restoring from backup..." -ForegroundColor Yellow
    git checkout backup-before-rewrite
    exit 1
}
