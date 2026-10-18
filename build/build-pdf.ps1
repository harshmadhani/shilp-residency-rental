# Generates PDFs from the HTML files in build/ using headless Chrome (falls back to Edge).
# Chrome prints its "bytes written" status to stderr, so stderr is not treated as fatal here.

$root   = Split-Path -Parent $PSScriptRoot
$build  = Join-Path $root 'build'
$pdfDir = Join-Path $root 'pdf'
New-Item -ItemType Directory -Force -Path $pdfDir | Out-Null

$browser = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $browser)) { $browser = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" }
if (-not (Test-Path $browser)) { throw "Chrome or Edge not found." }

$profile = Join-Path $env:TEMP ("pdfprof_" + [guid]::NewGuid().ToString("N"))
$old = $ErrorActionPreference
$ErrorActionPreference = 'SilentlyContinue'

foreach ($f in (Get-ChildItem -Path $build -Filter *.html)) {
  $out = Join-Path $pdfDir ($f.BaseName + '.pdf')
  $uri = 'file:///' + ($f.FullName -replace '\\', '/')
  & $browser --headless=new --disable-gpu --no-sandbox --user-data-dir="$profile" --no-pdf-header-footer --print-to-pdf="$out" $uri 2>&1 | Out-Null
  if (Test-Path $out) { Write-Host ("OK   " + $out) } else { Write-Host ("FAIL " + $out) }
}

Remove-Item -Recurse -Force $profile -ErrorAction SilentlyContinue
$ErrorActionPreference = $old
