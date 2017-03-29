$dbName = $OctopusParameters['DbName']
$user = $OctopusParameters['DbUser']
$pwd = $OctopusParameters['DbPassword']
$server = $OctopusParameters['DbServerName']

Write-Host DbName: $dbName
Write-Host User: $user
Write-Host Server: $server

& 'C:\Program Files (x86)\Microsoft SQL Server\120\DAC\bin\SqlPackage.exe' /Action:Script /OutputPath:Upgrade.publish.sql /SourceFile:TaskManager.Database.dacpac /TargetServerName:$server /TargetDatabaseName:$dbName /p:IncludeCompositeObjects=true /TargetUser:$user /TargetPassword:$pwd

& sqlcmd -S $server -U $user -P $pwd -i "Upgrade.publish.sql"