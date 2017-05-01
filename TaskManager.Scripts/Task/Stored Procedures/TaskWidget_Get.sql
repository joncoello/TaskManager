if exists(select * from sys.objects where name = 'TaskWidget_Get')
	drop procedure Task.TaskWidget_Get
go

Create Procedure Task.TaskWidget_Get

as

	select
		tc.CategoryName,
		Count(ti.TaskItemID) as [count]
	from
		Task.TaskItem ti
		inner join Task.TaskCategory tc on tc.TaskCategoryID = ti.TaskCategoryID
	group by
		tc.CategoryName
	order by
		tc.CategoryName

go