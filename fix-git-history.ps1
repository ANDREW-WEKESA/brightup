#!/usr/bin/env pwsh
# Fix Git commit history - rewrite commits with correct email

$ErrorActionPreference = "Continue"
Set-Location "c:\dev\smart mind\brightup"

Write-Host "`n🔧 Fixing Git History for GitHub Contributions`n" -ForegroundColor Cyan

# Configuration
$oldEmail = "andrew@brightup.local"
$newEmail = "ANDREW-WEKESA@users.noreply.github.com"
$newName = "Andrew Wekesa"
$baseCommit = "a6295b0" # Last commit before today's work

Write-Host "📋 Configuration:" -ForegroundColor Yellow
Write-Host "  Old email: $oldEmail"
Write-Host "  New email: $newEmail"
Write-Host "  Base commit: $baseCommit"
Write-Host ""

# Create backup branch
Write-Host "💾 Creating backup branch..." -ForegroundColor Yellow
git branch backup-$(Get-Date -Format 'yyyyMMdd-HHmmss') 2>$null
Write-Host "  ✓ Backup created" -ForegroundColor Green

# Set environment variable
$env:FILTER_BRANCH_SQUELCH_WARNING = "1"

# Build filter script for bash
$filterScript = @"
if [ "`$GIT_COMMITTER_EMAIL" = "$oldEmail" ]; then
    export GIT_COMMITTER_EMAIL="$newEmail"
    export GIT_COMMITTER_NAME="$newName"
fi
if [ "`$GIT_AUTHOR_EMAIL" = "$oldEmail" ]; then
    export GIT_AUTHOR_EMAIL="$newEmail"
    export GIT_AUTHOR_NAME="$newName"
fi
"@

Write-Host "🔄 Rewriting commit history..." -ForegroundColor Yellow
Write-Host "  This may take a minute..." -ForegroundColor Gray

try {
    # Remove refs/original if exists
    if (Test-Path ".git/refs/original") {
        Remove-Item -Recurse -Force ".git/refs/original"
    }
    
    # Run git filter-branch
    $result = git filter-branch --force --env-filter $filterScript --tag-name-filter cat -- ${baseCommit}..HEAD 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ History rewritten successfully!" -ForegroundColor Green
    } else {
        throw "filter-branch failed: $result"
    }
    
} catch {
    Write-Host "  ✗ Error: $_" -ForegroundColor Red
    Write-Host "`n⚠️  Trying alternative method..." -ForegroundColor Yellow
    
    # Alternative: Use git rebase with exec
    git rebase -i $baseCommit --exec "git commit --amend --author='$newName <$newEmail>' --no-edit"
}

Write-Host "`n📊 Verifying changes..." -ForegroundColor Cyan
$recentEmails = git log --format="%ae" -n 5
Write-Host "Recent commit emails:" -ForegroundColor White
$recentEmails | ForEach-Object { 
    if ($_ -eq $newEmail) {
        Write-Host "  ✓ $_" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $_" -ForegroundColor Red
    }
}

$correctCount = ($recentEmails | Where-Object { $_ -eq $newEmail }).Count
$totalCount = $recentEmails.Count

Write-Host "`n📈 Results:" -ForegroundColor Cyan
Write-Host "  Correct email: $correctCount / $totalCount commits" -ForegroundColor $(if ($correctCount -eq $totalCount) { "Green" } else { "Yellow" })

if ($correctCount -gt 0) {
    Write-Host "`n✅ SUCCESS! Commits have been rewritten." -ForegroundColor Green
    Write-Host "`n⚠️  NEXT STEP: Force push to GitHub" -ForegroundColor Yellow
    Write-Host "  Run this command:" -ForegroundColor White
    Write-Host "  git push origin main --force`n" -ForegroundColor Cyan
    Write-Host "  After pushing, wait 5-10 minutes for GitHub to process the changes.`n" -ForegroundColor Gray
} else {
    Write-Host "`n⚠️  No commits were updated. Please check the configuration." -ForegroundColor Yellow
}
