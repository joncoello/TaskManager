$dbName = $OctopusParameters['DbName']
$user = $OctopusParameters['DbUser']
$pwd = $OctopusParameters['DbPassword']
$server = $OctopusParameters['DbServerName']

Write-Host DbName: $dbName
Write-Host User: $user
Write-Host Server: $server

& 'TaskManager.DatabasePackage.exe'

& sqlcmd -S $server -U $user -P $pwd -i "scripts.sql"