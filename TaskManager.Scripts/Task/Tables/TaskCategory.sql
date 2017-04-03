if not exists (select * from sys.tables where name = 'TaskCategory')
	CREATE TABLE [Task].[TaskCategory] (
		[TaskCategoryID] uniqueidentifier           IDENTITY (1, 1) NOT NULL,
		[CategoryName]   VARCHAR (100)				NOT NULL,

		CONSTRAINT [PK_TaskCategory] PRIMARY KEY CLUSTERED ([TaskCategoryID] ASC)
	);

