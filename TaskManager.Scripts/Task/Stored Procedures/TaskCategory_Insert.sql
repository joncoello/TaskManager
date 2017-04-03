if exists(select * from sys.objects where name = 'TaskCategory_Insert')
	drop procedure Task.TaskCategory_Insert
go

Create Procedure Task.TaskCategory_Insert

	@TaskCategoryID uniqueidentifier,
	@CategoryName varchar(100)

as

	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(@TaskCategoryID, @CategoryName)

go