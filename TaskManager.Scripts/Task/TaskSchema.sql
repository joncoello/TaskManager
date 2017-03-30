if not exists (select * from sys.schemas where name ='Task')
	exec sp_executesql N'CREATE SCHEMA [Task]'