if not exists (select * from sys.tables where name = 'AspNetUserLogins')
	CREATE TABLE [dbo].[AspNetUserLogins](
		[LoginProvider] [nvarchar](128) NOT NULL,
		[ProviderKey] [nvarchar](128) NOT NULL,
		[UserId] [nvarchar](128) NOT NULL,
		
		CONSTRAINT [PK_dbo.AspNetUserLogins] PRIMARY KEY CLUSTERED ([LoginProvider] ASC, [ProviderKey] ASC, [UserId] ASC)
		)