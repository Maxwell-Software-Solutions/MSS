# VS Code Simple Browser Setup

## Changes Made

### 1. Updated `next.config.ts`

Modified the `headers()` function to return permissive headers in development mode that allow VS Code's Simple Browser to embed the Next.js dev server.

**Dev mode headers** (when `NODE_ENV !== 'production'`):

- **Content-Security-Policy**: Allows `unsafe-eval` and `unsafe-inline` for Next.js dev features, WebSocket connections for HMR, and `frame-ancestors vscode-webview://*` for embedding
- **X-Frame-Options**: Set to `ALLOWALL` to prevent frame blocking

**Production mode headers**: Unchanged - maintains security headers

### 2. Created verification script

Added `scripts/check-dev-headers.ps1` to verify headers are correctly configured.

## How to Test

### Step 1: Restart the dev server

If the dev server is already running, stop it (Ctrl+C) and restart:

```powershell
pnpm dev
```

### Step 2: Verify headers

Run the verification script:

```powershell
.\scripts\check-dev-headers.ps1
```

Or manually check with curl (if available):

```powershell
curl.exe -I http://127.0.0.1:3000 | Select-String "content-security-policy|x-frame-options"
```

### Step 3: Test in VS Code Simple Browser

1. Open the Command Palette (`Ctrl+Shift+P`)
2. Type "Simple Browser: Show"
3. Enter URL: `http://127.0.0.1:3000`
4. The site should load without being blocked

## Expected Headers in Dev Mode

```
Content-Security-Policy: default-src 'self' http: https: data: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' http: https: blob:; style-src 'self' 'unsafe-inline' http: https:; img-src 'self' data: blob: http: https:; connect-src 'self' ws: wss: http: https:; frame-ancestors 'self' vscode-webview://*
X-Frame-Options: ALLOWALL
```

## Key Points

- **Dev only**: These permissive headers only apply in development (`NODE_ENV !== 'production'`)
- **Production safety**: Production builds maintain strict security headers
- **HMR support**: `unsafe-eval` is required for Next.js Fast Refresh and source maps
- **WebSocket**: `ws:` and `wss:` in `connect-src` allow Hot Module Replacement
- **Embedding**: `frame-ancestors vscode-webview://*` allows VS Code to embed the page

## Troubleshooting

### If Simple Browser shows blank/blocked page:

1. **Check dev server is running**: Visit `http://127.0.0.1:3000` in a regular browser
2. **Verify headers**: Run `.\scripts\check-dev-headers.ps1`
3. **Check console**: Open VS Code Developer Tools (`Help > Toggle Developer Tools`) for CSP violations
4. **Restart VS Code**: Sometimes VS Code needs a restart after header changes

### If you see CSP errors in console:

Make sure `NODE_ENV` is not set to `production`. Check with:

```powershell
$env:NODE_ENV
```

If it returns `production`, unset it:

```powershell
Remove-Item Env:\NODE_ENV
```

Then restart the dev server.

## References

- Next.js Custom Headers: https://nextjs.org/docs/app/api-reference/next-config-js/headers
- Content Security Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- VS Code Simple Browser: https://code.visualstudio.com/docs/editor/web
