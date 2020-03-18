exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert(
        [{
          user_id: 4,
          fname: 'Ahmed',
          lname: 'hehe',
          password: '$2b$10$mH5.AMX4291PKbP0meUGbu1C4.nQjg/sBvgA.s24FgfKcRg7LSzU.',
          email: 'khattak1994@gmail.com',
          date_created: '2020-02-20 19:47:16'
        },
        {
          user_id: 6,
          fname: 'Ahmed',
          lname: 'hehe',
          password: '$2b$10$uZzxtl29IohEDzh4LTgG.ugwSobXgPGwoGgnhuQ4SX8eiVerXUZeu',
          email: 'khattak1994@gmaizl.com',
          date_created: '2020-02-20 19:52:06'
        },
        {
          user_id: 10,
          fname: 'Ahmed',
          lname: 'hehe',
          password: '$2b$10$CXkNmnMbn7abhz675abm2enHakNAu6LPCopPoZWuR87es/vbcEo42',
          email: 'khattak1994@yahoo.com',
          date_created: '2020-02-21 19:18:50'
        },
        {
          user_id: 12,
          fname: 'Ahmed',
          lname: 'hehe',
          password: '$2b$10$fozFYD42MbCMzUX7zD1qEuyPWuQAGOFKn4mx2i8ICzT.443pLT34W',
          email: 'khattak1994@yahooz.com',
          date_created: '2020-02-21 19:39:13'
        },
        {
          user_id: 14,
          fname: 'Ahmed',
          lname: 'Rafiullah',
          password: '$2b$10$aA/mMEIBB08nhIruf8ayk.jZVIks/KscT6y1UUAryEV0PXBY/DsYC',
          email: 'khattak1994@sheet.com',
          date_created: '2020-02-21 20:50:03'
        },
        {
          user_id: 15,
          fname: 'Ahmed',
          lname: 'Rafiullah',
          password: '$2b$10$ygKzNV6Qi3d/VyAv6XLMmuXeMgG3.vVh8vtoLAOp1nYutNYPKClz2',
          email: 'khattak1994@myjobportal.com',
          date_created: '2020-02-23 19:13:20'
        },
        {
          user_id: 16,
          fname: 'Ahmed',
          lname: 'Rafiullah',
          password: '$2b$10$g2jdDWu.q1MnO1hQaIWOe.z./0p/JTgoiuJg56T6sk.1K2FGflrbq',
          email: 'khattak@myjobportal.com',
          date_created: '2020-02-25 18:10:48'
        }
        ]
      )
    })
}
