use master
go

-- DB
if exists (select * from sys.databases where name = 'SQLClientTest')
	drop database SQLClientTest
go

Create Database SQLClientTest
go

use SQLClientTest
go

-- Tables
Create Table TestSimpleEntity(
	TestSimpleEntityID		int				not null,
	TestSimpleEntityName	varchar(100)	not null,

	Constraint PK_TestSimpleEntity Primary Key (TestSimpleEntityID)
)

go

Create Table TestComplexEntity(
	TestComplexEntityID		int				not null,
	TestComplexEntityName	varchar(100)	not null,
	TestSimpleEntityID		int				not null,

	Constraint PK_TestComplexEntity Primary Key (TestComplexEntityID),
	Constraint FK_TestComplexEntity_TestSimpleEntity Foreign Key (TestSimpleEntityID) references TestSimpleEntity (TestSimpleEntityID)
)

go

-- Data
insert into TestSimpleEntity(TestSimpleEntityID, TestSimpleEntityName)
values (1, 'bob'),(2, 'helen'),(3, 'mark'),(4, 'jane')
go

insert into TestComplexEntity(TestComplexEntityID, TestComplexEntityName, TestSimpleEntityID)
values (1, 'child 1', 1),(2, 'child 2', 2),(3, 'child 3', 2),(4, 'child 4', 3),(5, 'child 5', 4),(6, 'child 6', 4)
go

-- Procs
create procedure spGetTestSimpleEntity

	@TestSimpleEntityID int

as

	select 
		TestSimpleEntityID as ID, 
		TestSimpleEntityName
	from 
		TestSimpleEntity 
	where 
		TestSimpleEntityID = @TestSimpleEntityID

go


create procedure spGetTestComplexEntities

as

	select 
		ce.TestComplexEntityID as ID,
		ce.TestComplexEntityName,
		ce.TestSimpleEntityID as ParentID,
		se.TestSimpleEntityID as ID,
		se.TestSimpleEntityName
		
	from 
		TestSimpleEntity se
		inner join TestComplexEntity ce on ce.TestSimpleEntityID = se.TestSimpleEntityID
	

go