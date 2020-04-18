
-- User CRUD for adding new users and changing passwords ! You cant change email tho and it should be unique email


-- insert user with all their details : CREATE 
insert into users (fname, lname, password,email, date_created)
values ('Ahmed','Rafiullah','asd234dt54','khattak.hege@yahoo.com',now());


-- see all users : READ
select * from users; 


-- update a users password : UPDATE
update users 
set password = 'hehe'
where user_id = 5;

-- delete a user ! I will set it to cascade the delete by removing all the users groups and todos : DELETE
delete from users where user_id = 1;






