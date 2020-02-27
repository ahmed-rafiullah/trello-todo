
-- Groups CRUD for adding new users and changing passwords ! You cant change email tho and it should be unique email


-- insert group with all their details : CREATE 
insert into groupz (group_name, date_created, user_id)
values ('HEHE',now(),1);


-- see all users : READ
select * from groupz; 


-- update group name
update users 
set password = 'hehe'
where user_id = 5;

-- delete a group will always require a user id ! otherwise any user could delete anyother users todo !
--  ! I will set it to cascade the delete by removing all the todos for that user ! // this action should be authorzied beforehand
delete from groupz where user_id = 1;