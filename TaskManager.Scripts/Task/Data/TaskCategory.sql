if not exists (select * from Task.TaskCategory where CategoryName = '00 - (none)')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), '00 - (none)')

if not exists (select * from Task.TaskCategory where CategoryName = '10 - Urgent')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), '10 - Urgent')

if not exists (select * from Task.TaskCategory where CategoryName = '20 - High')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), '20 - High')

if not exists (select * from Task.TaskCategory where CategoryName = '30 - Medium')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), '30 - Medium')

if not exists (select * from Task.TaskCategory where CategoryName = '40 - Low')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), '40 - Low')

go

update Task.TaskCategory set CategoryName = '00 - (none)' where CategoryName = '(none)'
update Task.TaskCategory set CategoryName = '10 - Urgent' where CategoryName = 'Urgent'
update Task.TaskCategory set CategoryName = '20 - High' where CategoryName = 'High'
update Task.TaskCategory set CategoryName = '30 - Medium' where CategoryName = 'Medium'
update Task.TaskCategory set CategoryName = '40 - Low' where CategoryName = 'Low'

go