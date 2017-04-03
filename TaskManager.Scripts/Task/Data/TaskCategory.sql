if not exists (select * from Task.TaskCategory where CategoryName = 'Urgent')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), 'Urgent')

if not exists (select * from Task.TaskCategory where CategoryName = 'Urgent')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), 'High')

if not exists (select * from Task.TaskCategory where CategoryName = 'Urgent')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), 'Medium')

if not exists (select * from Task.TaskCategory where CategoryName = 'Urgent')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), 'Low')

