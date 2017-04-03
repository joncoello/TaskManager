if exists(select * from sys.objects where name = 'TaskCategory_Update')
	drop procedure Task.TaskCategory_Update
go

Create Procedure Task.TaskCategory_Update

	@TaskCategoryID uniqueidentifier,
	@CategoryName varchar(100)

as

	update
		TaskCategory
	set
		CategoryName = @CategoryName
	where
		TaskCategoryID = @TaskCategoryID

go