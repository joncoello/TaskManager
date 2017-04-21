if exists(select * from sys.objects where name = 'TaskItem_GetAll')
	drop procedure Task.TaskItem_GetAll
go

Create Procedure Task.TaskItem_GetAll

as

	select
		ti.TaskItemID,
		ti.TaskName,
		tc.TaskCategoryID,
		tc.CategoryName
	from
		Task.TaskItem ti
		inner join Task.TaskCategory tc on tc.TaskCategoryID = ti.TaskCategoryID
	order by
		tc.CategoryName

go