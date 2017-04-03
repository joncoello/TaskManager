if exists(select * from sys.objects where name = 'TaskCategory_Delete')
	drop procedure Task.TaskCategory_Delete
go

Create Procedure Task.TaskCategory_Delete

	@TaskCategoryID uniqueidentifier

as

	delete from Task.TaskCategory where TaskCategoryID = @TaskCategoryID

go