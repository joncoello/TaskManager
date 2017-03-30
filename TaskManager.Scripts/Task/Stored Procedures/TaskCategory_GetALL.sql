if exists(select * from sys.objects where name = 'Tasks_GetAll')
	drop procedure Task.Tasks_GetAll
go

Create Procedure Task.Tasks_GetAll

as

	select
		TaskCategoryID,
		CategoryName
	from
		Task.TaskCategory

