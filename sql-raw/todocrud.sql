
-- TODO CRUD for a  user and adding to a group if necessary


-- insert todo for a specific user and todo is not completed : CREATE
insert into todos (todo_title, todo_description,user_id, date_created)
values ('TODO','This is my todo bithc',1,now());

-- insert into todos for a specific user while it is already completed since it is boolean internally tinyint(1) which takes 0 : false , 1: true 
-- set it to 1 for it to be completed i.e true : CREATE

-- insert into todos (todo_title, todo_description,user_id, date_created, completed)
--  values ('TODO','This is my todo bithc',7,now(),1);

insert into todos (todo_title, todo_description,user_id, date_created, completed, group_id)
select 'TODO','This is my todo bithc',7,now(),1,6
where 6 in (SELECT distinct 
            group_id
        FROM
            groupz
        WHERE
            user_id = 7) ;
 

-- add a todo which also belongs to group but a group must exist first for it to be true : CREATE
insert into groupz (group_name,user_id,date_created) 
values ('my first group',1,now());

-- see group : READ
select * from groupz; 


-- update a todo to be part of a group : CREATE
-- PROBLEM: updating todo we can set its group to be a different group than its user defined group we dont want that
-- We only want it to update a todo where its user id matches the user id of the group we want  
-- update todos
-- INNER JOIN  
select * from todos
-- INNER JOIN users ON users.user_id = todos.user_id
INNER JOIN groupz ON todos.user_id = groupz.user_id;

-- update only those todos to have groups that their users have only 
UPDATE todos 
SET 
    todos.group_id = 3
WHERE
    todos.todo_id = 9
        AND 3 IN (SELECT DISTINCT
            group_id
        FROM
            groupz
        WHERE
            user_id = todos.user_id);
            
            
SELECT 
    group_id
FROM
    groupz
WHERE
    user_id = 1 AND group_id = 4;
         

-- get todos : READ
select * from todos;



-- update a todo to be completed. Not correct as it needs to be only 0 or 1 table needs changing : UPDATE
update todos 
set completed = 5 -- <-- this is a problem this should not happen !
where todo_id = 2;

-- delete a todo ! : DELETE
delete from todos where todo_id = 2;


-- pagination !
SET @count = 5;
SET @pagez = 2;
SET @offsetz = (@pagez - 1) * @count;

select @offsetz; 

 select * from todos limit 5 , 5;
 
 select * from todos;






