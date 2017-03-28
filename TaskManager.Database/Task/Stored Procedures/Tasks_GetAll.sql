
Create Procedure Task.Tasks_GetAll

as

	select
		TaskCategoryID,
		CategoryName
	from
		Task.TaskCategory

