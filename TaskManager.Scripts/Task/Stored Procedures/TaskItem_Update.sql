if exists(select * from sys.objects where name = 'TaskItem_Update')
	drop procedure Task.TaskItem_Update
go

Create Procedure Task.TaskItem_Update

	@TaskItemID uniqueidentifier,
	@TaskCategoryID uniqueidentifier = null,
	@TaskName varchar(100)

as

	if @TaskCategoryID is null
		select @TaskCategoryID = TaskCategoryID from Task.TaskCategory where CategoryName = '(none)'

	update
		Task.TaskItem
	set
		TaskName = @TaskName,
		TaskCategoryID = @TaskCategoryID
	where
		TaskItemID = @TaskItemID

go