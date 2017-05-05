if exists(select * from sys.objects where name = 'TaskItem_GetAll')
	drop procedure Task.TaskItem_GetAll
go

Create Procedure Task.TaskItem_GetAll

	@category varchar(100) = null

as

	select
		ti.TaskItemID,
		ti.TaskName,
		ti.TaskCategoryID,
		tc.TaskCategoryID,
		tc.CategoryName
	from
		Task.TaskItem ti
		inner join Task.TaskCategory tc on tc.TaskCategoryID = ti.TaskCategoryID
	where
		@category is null
		or (@category is not null and tc.CategoryName = @category)
	order by
		tc.CategoryName

go