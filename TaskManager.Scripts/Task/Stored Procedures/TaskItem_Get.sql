if exists(select * from sys.objects where name = 'TaskItem_Get')
	drop procedure Task.TaskItem_Get
go

Create Procedure Task.TaskItem_Get

	@TaskItemID uniqueidentifier

as

	select
		TaskItemID,
		TaskName
	from
		Task.TaskItem
	where
		TaskItemID = @TaskItemID

go