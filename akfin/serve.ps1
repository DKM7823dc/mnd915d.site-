# Serve the replica locally so the app's absolute /create-sex-friend/ paths resolve.
# Usage:  .\serve.ps1        (defaults to http://localhost:8080/create-sex-friend/)
#         .\serve.ps1 -Port 9000
param([int]$Port = 8080)

# Serve THIS directory (10-8gu) as the web root.
python -m http.server $Port --directory $PSScriptRoot
