$ErrorActionPreference = 'Stop'
Push-Location -LiteralPath $PSScriptRoot
try {
    $war = Join-Path $PSScriptRoot 'target/ecommerce-payments-0.0.1-SNAPSHOT.war'
    if (-not (Test-Path -LiteralPath $war)) {
        & mvn -B -ntp package
        if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }
    }
    & java -jar $war
    if ($LASTEXITCODE -ne 0) { throw 'Application stopped with an error. Check whether port 8093 is already in use.' }
}
finally { Pop-Location }
