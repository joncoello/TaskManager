if exists(select * from sys.objects where name = 'TaskItem_Insert')
	drop procedure Task.TaskItem_Insert
go

Create Procedure Task.TaskItem_Insert	

	@TaskItemID uniqueidentifier,
	@TaskCategoryID uniqueidentifier = null,
	@TaskName varchar(100)

as

	if @TaskCategoryID is null
		select @TaskCategoryID = TaskCategoryID from Task.TaskCategory where CategoryName = '(none)'

	insert into Task.TaskItem(TaskItemID, TaskCategoryID, TaskName)
	values(@TaskItemID, @TaskCategoryID, @TaskName)

	select * from Task.TaskItem where TaskItemID = @TaskItemID

go