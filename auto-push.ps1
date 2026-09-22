# Double-click this file ONCE. It will then watch your site folder
# and auto-push every change to GitHub (Vercel redeploys by itself).
# Leave this window open while you work. Close it to stop.

$RepoDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $RepoDir

if (-not (Test-Path ".git")) {
    Write-Host ""
    Write-Host "This folder is not connected to GitHub yet. Do this ONCE:" -ForegroundColor Yellow
    Write-Host "  1. Install Git from https://git-scm.com/download/win"
    Write-Host "  2. Install GitHub Desktop from https://desktop.github.com"
    Write-Host "  3. In GitHub Desktop: File > Clone repository > pick your birthday repo"
    Write-Host "  4. Copy the 'birthday-love' folder (with my latest edits) into the cloned folder,"
    Write-Host "     replacing the old one, and copy THIS script next to it."
    Write-Host "  5. Double-click this script again."
    Write-Host ""
    Read-Host "Press Enter to close"
    exit
}

Write-Host "Auto-push started. Every file save will go live in ~1 minute." -ForegroundColor Green
Write-Host "Keep this window open. Close it to stop." -ForegroundColor Green

while ($true) {
    Start-Sleep -Seconds 20
    git add -A 2>$null
    git diff --cached --quiet 2>$null
    if ($LASTEXITCODE -ne 0) {
        $time = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        git commit -m "auto update $time" 2>$null
        git push 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$time] Pushed. Vercel is redeploying..." -ForegroundColor Green
        } else {
            Write-Host "[$time] Push failed. Open GitHub Desktop once and sign in, then leave this running." -ForegroundColor Yellow
        }
    }
}
