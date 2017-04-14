if exists(select * from sys.objects where name = 'TaskItem_Delete')
	drop procedure Task.TaskItem_Delete
go

Create Procedure Task.TaskItem_Delete

	@TaskItemID uniqueidentifier

as

	delete from Task.TaskItem where TaskItemID = @TaskItemID

go