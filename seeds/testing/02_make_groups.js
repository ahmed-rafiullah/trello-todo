exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groupz').del()
    .then(function () {
      // Inserts seed entries
      return knex('groupz').insert([{
          "group_id": 5,
          "group_name": "doing",
          "date_created": "2020-02-25 12:58:44",
          "user_id": 15
        },
        {
          "group_id": 6,
          "group_name": "todo",
          "date_created": "2020-02-25 12:58:48",
          "user_id": 15
        },
        {
          "group_id": 7,
          "group_name": "done",
          "date_created": "2020-02-25 12:58:52",
          "user_id": 15
        },
        {
          "group_id": 8,
          "group_name": "done",
          "date_created": "2020-02-25 18:17:47",
          "user_id": 16
        }
      ]);
    });
};