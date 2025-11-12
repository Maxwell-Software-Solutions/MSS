# Script to verify dev headers for VS Code Simple Browser compatibility
Write-Host "Checking headers for VS Code Simple Browser compatibility..." -ForegroundColor Cyan
Write-Host ""

# Check main page
Write-Host "=== Main page headers ===" -ForegroundColor Yellow
try {
 $response = Invoke-WebRequest -Uri "http://127.0.0.1:3000" -Method Head -TimeoutSec 5
    
 $csp = $response.Headers.'Content-Security-Policy'
 $xfo = $response.Headers.'X-Frame-Options'
    
 Write-Host "Content-Security-Policy: $csp" -ForegroundColor $(if ($csp -like "*vscode-webview*") { "Green" } else { "Red" })
 Write-Host "X-Frame-Options: $xfo" -ForegroundColor $(if ($xfo -eq "ALLOWALL") { "Green" } else { "Red" })
    
 Write-Host ""
    
 # Check if CSP contains required directives
 $required = @("unsafe-eval", "vscode-webview", "ws:", "wss:")
 foreach ($item in $required) {
  if ($csp -like "*$item*") {
   Write-Host "✓ CSP contains '$item'" -ForegroundColor Green
  }
  else {
   Write-Host "✗ CSP missing '$item'" -ForegroundColor Red
  }
 }
    
 Write-Host ""
 Write-Host "=== Next.js static chunk headers ===" -ForegroundColor Yellow
 $staticResponse = Invoke-WebRequest -Uri "http://127.0.0.1:3000/_next/static/chunks/webpack.js" -Method Head -TimeoutSec 5 -ErrorAction SilentlyContinue
 if ($staticResponse) {
  $staticCsp = $staticResponse.Headers.'Content-Security-Policy'
  $staticXfo = $staticResponse.Headers.'X-Frame-Options'
  Write-Host "Content-Security-Policy: $staticCsp" -ForegroundColor $(if ($staticCsp -like "*vscode-webview*" -or !$staticCsp) { "Green" } else { "Red" })
  Write-Host "X-Frame-Options: $staticXfo" -ForegroundColor $(if ($staticXfo -eq "ALLOWALL" -or !$staticXfo) { "Green" } else { "Red" })
 }
    
}
catch {
 Write-Host "Error: Dev server may not be running on http://127.0.0.1:3000" -ForegroundColor Red
 Write-Host "Start it with: pnpm dev" -ForegroundColor Yellow
}
