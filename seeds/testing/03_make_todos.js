exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([{
          "todo_id": 12,
          "title": "fuakkkk",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 19:18:30",
          "user_id": 15,
          "group_id": 7
        },
        {
          "todo_id": 13,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 19:18:30",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 14,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:24",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 15,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:25",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 16,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:25",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 17,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:26",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 18,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:26",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 19,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:27",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 20,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:27",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 21,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:28",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 22,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:28",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 23,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:29",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 24,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:30",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 25,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:30",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 26,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:31",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 27,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:32",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 28,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:33",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 29,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:34",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 30,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:35",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 31,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:36",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 32,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:37",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 33,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:37",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 34,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-24 21:00:38",
          "user_id": 15,
          "group_id": null
        },
        {
          "todo_id": 38,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-25 18:08:36",
          "user_id": 15,
          "group_id": 6
        },
        {
          "todo_id": 39,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-25 18:10:15",
          "user_id": 15,
          "group_id": 6
        },
        {
          "todo_id": 40,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-25 18:10:24",
          "user_id": 15,
          "group_id": 6
        },
        {
          "todo_id": 41,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-25 18:10:37",
          "user_id": 15,
          "group_id": 7
        },
        {
          "todo_id": 42,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-25 18:18:35",
          "user_id": 16,
          "group_id": 8
        },
        {
          "todo_id": 43,
          "title": "Now this is pod racing",
          "description": "Do this thing that i need to complete",
          "completed": 0,
          "date_created": "2020-02-26 19:38:17",
          "user_id": 16,
          "group_id": null
        }
      ]);
    });
};