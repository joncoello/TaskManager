function Get-ScriptDirectory
{
  $Invocation = (Get-Variable MyInvocation -Scope 1).Value
  Split-Path $Invocation.MyCommand.Path
}

$dbName = $OctopusParameters['DbName']
$user = $OctopusParameters['DbUser']
$pwd = $OctopusParameters['DbPassword']
$server = $OctopusParameters['DbServerName']
$currentDirectory = Get-ScriptDirectory

$databasePackagePath = $currentDirectory + '\TaskManager.DatabasePackage.exe'

Write-Host DbName: $dbName
Write-Host User: $user
Write-Host Server: $server
Write-Host $databasePackagePath

& $databasePackagePath

& sqlcmd -S $server -U $user -P $pwd -i "scripts.sql"

