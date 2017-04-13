if exists(select * from sys.objects where name = 'TaskItem_GetAll')
	drop procedure Task.TaskItem_GetAll
go

Create Procedure Task.TaskItem_GetAll

as

	select
		TaskItemID,
		TaskName
	from
		Task.TaskItem

go