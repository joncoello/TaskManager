if not exists (select * from Task.TaskCategory where CategoryName = '(none)')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), '(none)')

if not exists (select * from Task.TaskCategory where CategoryName = 'Urgent')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), 'Urgent')

if not exists (select * from Task.TaskCategory where CategoryName = 'High')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), 'High')

if not exists (select * from Task.TaskCategory where CategoryName = 'Medium')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), 'Medium')

if not exists (select * from Task.TaskCategory where CategoryName = 'Low')
	insert into Task.TaskCategory(TaskCategoryID, CategoryName)
	values(newid(), 'Low')

go

update Task.TaskCategory set CategoryName = '00 - (none)' where CategoryName = '(none)'
update Task.TaskCategory set CategoryName = '10 - Urgent' where CategoryName = 'Urgent'
update Task.TaskCategory set CategoryName = '20 - High' where CategoryName = 'High'
update Task.TaskCategory set CategoryName = '30 - Medium' where CategoryName = 'Medium'
update Task.TaskCategory set CategoryName = '40 - Low' where CategoryName = 'Low'

go