$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
Push-Location -LiteralPath $projectRoot

try {
    & mvn -B -ntp net.revelc.code.formatter:formatter-maven-plugin:2.29.0:format `
        '-Dconfigfile=tools/formatting/java.xml' `
        '-Dformatter.includes=**/*.java' `
        '-Dmaven.compiler.source=25' `
        '-Dmaven.compiler.target=25'
    if ($LASTEXITCODE -ne 0) { throw 'Java formatting failed.' }

    if (-not (Test-Path -LiteralPath 'tools/formatting/node_modules/prettier')) {
        & npm ci --prefix tools/formatting
        if ($LASTEXITCODE -ne 0) { throw 'Installing local web formatters failed.' }
    }

    & node tools/formatting/format-sources.cjs
    if ($LASTEXITCODE -ne 0) { throw 'Web source formatting failed.' }

    if (-not (Test-Path -LiteralPath 'tools/formatting/python/black')) {
        & python -m pip install --disable-pip-version-check --target tools/formatting/python 'black==26.10.1'
        if ($LASTEXITCODE -ne 0) { throw 'Installing local Python/SQL formatters failed.' }
    }

    & python tools/formatting/format-python.py
    if ($LASTEXITCODE -ne 0) { throw 'Python formatting failed.' }
}
finally {
    Pop-Location
}
