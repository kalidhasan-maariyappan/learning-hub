$ErrorActionPreference = 'Stop'

Push-Location $PSScriptRoot
$previousProfile = $env:SPRING_PROFILES_ACTIVE
$previousSecret = $env:JWT_SECRET
try {
    $listener = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue
    if ($listener) {
        throw 'Port 8080 is already in use. Stop the existing application before starting another instance.'
    }
    if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
        throw 'Maven 3.9+ is required. Install Maven and add its bin directory to PATH.'
    }
    if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
        throw 'JDK 25+ is required. Install a JDK and configure JAVA_HOME and PATH.'
    }

    if (-not $env:JWT_SECRET) {
        $secretPath = Join-Path $PSScriptRoot 'data/dev-jwt-secret'
        if (-not (Test-Path -LiteralPath $secretPath)) {
            New-Item -ItemType Directory -Path (Split-Path $secretPath) -Force | Out-Null
            $bytes = New-Object byte[] 48
            $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
            try { $rng.GetBytes($bytes) } finally { $rng.Dispose() }
            [System.IO.File]::WriteAllText($secretPath, [Convert]::ToBase64String($bytes))
        }
        $env:JWT_SECRET = [System.IO.File]::ReadAllText($secretPath).Trim()
    }

    $env:SPRING_PROFILES_ACTIVE = 'dev'
    Write-Host 'Starting Patient API. Swagger: http://localhost:8080/swagger-ui.html'
    & mvn spring-boot:run
    if ($LASTEXITCODE -ne 0) { throw "Application exited with code $LASTEXITCODE." }
} finally {
    $env:SPRING_PROFILES_ACTIVE = $previousProfile
    $env:JWT_SECRET = $previousSecret
    Pop-Location
}
