if exists(select * from sys.objects where name = 'Tasks_GetAll')
	drop procedure Task.Tasks_GetAll
go

if exists(select * from sys.objects where name = 'TaskCategory_GetAll')
	drop procedure Task.TaskCategory_GetAll
go

Create Procedure Task.TaskCategory_GetAll

as

	select
		TaskCategoryID,
		CategoryName
	from
		Task.TaskCategory

go