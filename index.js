require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const userRoute = require('./api-v1/controllers/user');
const groupRoute = require('./api-v1/controllers/group');
const todoRoute = require('./api-v1/controllers/todo');
const helmet = require('helmet');
const cors = require('cors')
const {
  knex,
  dbCheckConnection
} = require('./db')

const {
  Model
} = require('objection');




const app = express();

app.use(cors())
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());
app.use('/api/v1/users', userRoute);
app.use('/api/v1/groups', groupRoute);
app.use('/api/v1/todos', todoRoute);
app.use(express.static('public'));

// 404
app.use((req, res) => {
  // HTTP status 404: NotFound
  res.status(404).json({
    error: '404 Not Found'
  });
});

// All other errors are handled here
app.use((err, req, res, next) => {
  // HTTP status 404: NotFound
  console.log(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

// if database is connected then run server
dbCheckConnection().then(() => {
  console.log('database connected')
  app.listen(process.env.SERVER_PORT || 3000, () => {
    // check for db connectivity if non exit process
    console.info(`Server has started at ${process.env.SERVER_PORT}`);
    // config objection
    Model.knex(knex);
  });
})


process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});






/*
Login
logout
using jwt or something else like session

View user info
Remove account action
Update account info

View all user todos
Filter todo by its content i.e title or desc
Filter todo by its status

Add todo
Update todo
Delete todo

CRUD on todo statuses

*/

/*
TODO:

Understand sql more and learn sequelize fcking
Add validation middleware
Add Linter - DONE
Add formatter - DONE
Add precommit or pre push hooks to ensure formatting and linting 
Add Authentication - using all kinds of methods and sheeet - Start with express session
Restructor App
Learn sequelize
Learn more sql
Perform migrations
Learn nodejs
Add Swagger Docs
Learn advanced js
Do all the above in typescript
Dockerify this app
And add ci cd 
And then deploy it
*/