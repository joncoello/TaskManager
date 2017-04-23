if not exists (select * from sys.tables where name = 'AspNetRoles')
	CREATE TABLE [dbo].[AspNetRoles](
		[Id] [nvarchar](128) NOT NULL,
		[Name] [nvarchar](256) NOT NULL,
 
		CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED ([Id] ASC)
		)