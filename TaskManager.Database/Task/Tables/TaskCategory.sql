CREATE TABLE [Task].[TaskCategory] (
    [TaskCategoryID] INT           IDENTITY (1, 1) NOT NULL,
    [CategoryName]   VARCHAR (100) NOT NULL,
    CONSTRAINT [PK_TaskCategory] PRIMARY KEY CLUSTERED ([TaskCategoryID] ASC)
);

