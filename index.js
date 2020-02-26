require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const userRoute = require('./api/controllers/user');
const groupRoute = require('./api/controllers/group');
const todoRoute = require('./api/controllers/todo');
const helmet = require('helmet');
const cors = require('cors')


const {
  knex,
  dbCheckConnection
} = require('./db')

const {
  Model
} = require('objection');

const swaggerUi = require('swagger-ui-express');
const {
  swaggerSpec
} = require('./swagger')


const options = {
  explorer: true
};





const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));
app.use(cors())
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());
app.use('/api/users', userRoute);
app.use('/api/groups', groupRoute);
app.use('/api/todos', todoRoute);

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
  app.listen(process.env.SERVER_PORT, () => {
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


Understand sql more and learn sequelize fcking
Add validation middleware
Add Linter - DONE
Add formatter - DONE
Add precommit or pre push hooks to ensure formatting and linting 
Add Authentication - using all kinds of methods and sheeet - Start with jwt cuz das easiest !
Restructor App

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