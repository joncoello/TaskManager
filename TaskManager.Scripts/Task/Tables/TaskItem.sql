if not exists (select * from sys.tables where name = 'TaskItem')
	CREATE TABLE [Task].[TaskItem] (
		[TaskItemID]		uniqueidentifier			NOT NULL,
		[TaskCategoryID]	uniqueidentifier			NOT NULL,
		[TaskName]			VARCHAR (100)				NOT NULL,

		CONSTRAINT [PK_TaskItem] PRIMARY KEY CLUSTERED ([TaskItemID] ASC),
		CONSTRAINT [FK_TaskItem_TaskCateogry] FOREIGN KEY ([TaskCategoryID]) REFERENCES [Task].[TaskCategory](TaskCategoryID)
	);

