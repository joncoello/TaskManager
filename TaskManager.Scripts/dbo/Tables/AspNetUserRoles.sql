if not exists (select * from sys.tables where name = 'AspNetUserRoles')
	CREATE TABLE [dbo].[AspNetUserRoles](
		[UserId] [nvarchar](128) NOT NULL,
		[RoleId] [nvarchar](128) NOT NULL,
		
		CONSTRAINT [PK_dbo.AspNetUserRoles] PRIMARY KEY CLUSTERED ([UserId] ASC, [RoleId] ASC)
		)