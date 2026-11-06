param([switch]$SkipBuild)
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')
if (-not $env:JWT_SECRET) {
    $env:JWT_SECRET = [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
    Write-Host 'Generated a signing key for this shell session. Set JWT_SECRET yourself to keep tokens valid across sessions.'
}
if (-not $SkipBuild) {
    & .\mvnw.cmd verify
    if ($LASTEXITCODE -ne 0) { throw 'Build failed' }
}
& java -jar target/task-management-0.0.1-SNAPSHOT.jar
exit $LASTEXITCODE
