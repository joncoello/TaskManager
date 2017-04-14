if exists(select * from sys.objects where name = 'TaskItem_Update')
	drop procedure Task.TaskItem_Update
go

Create Procedure Task.TaskItem_Update

	@TaskItemID uniqueidentifier,
	@TaskName varchar(100)

as

	update
		Task.TaskItem
	set
		TaskName = @TaskName
	where
		TaskItemID = @TaskItemID

go