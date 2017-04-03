if exists(select * from sys.objects where name = 'TaskCategory_Get')
	drop procedure Task.TaskCategory_Get
go

Create Procedure Task.TaskCategory_Get

	@TaskCategoryID uniqueidentifier

as

	select
		TaskCategoryID,
		CategoryName
	from
		Task.TaskCategory
	where
		TaskCategoryID = @TaskCategoryID

go