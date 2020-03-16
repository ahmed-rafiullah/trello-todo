const morgan = require('morgan');
const express = require('express');
const {
  userController
} = require('./components/user');
const {
  groupController
} = require('./components/group');
const {
  todoController
} = require('./components/todo');

const helmet = require('helmet');
const cors = require('cors')
const {
  globalErrorHandler: errorHandler
} = require('./components/utilities')



const swaggerUi = require('swagger-ui-express');
const {
  swaggerSpec
} = require('./configs')


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
app.use('/api/users', userController);
app.use('/api/groups', groupController);
app.use('/api/todos', todoController);

// 404
app.use((req, res) => {
  // HTTP status 404: NotFound
  res.status(404).json({
    error: '404 Not Found'
  });
});

// All other errors are handled here
app.use(async (err, req, res, next) => {
  // HTTP status 404: NotFound
  // use centralized error handler here
  const errorResult = await errorHandler(err)


  // exit app if fatal
  if (errorResult.fatal === true) {
    console.log('fatal error')
    process.exit(1)
  }

  // other wise 
  res.status(errorResult.reponseCode).json({
    ...errorResult.payload
  });
});



process.addListener('unhandledRejection', (err) => {
  // log the error
  // fatal
  throw err
})



process.addListener('uncaughtException', async (err) => {
  // log the error
  // fatal
  const errorResult = await errorHandler(err)


  // exit app if fatal
  if (errorResult.fatal === true) {
    console.log('fatal error')
    process.exit(1)
  }

})





module.exports = {
  app
}




// FIXME: There is a bug in pm2 run ap.js using no daemon
// and ctrcl-c. Run it again and then call npx pm2 stop ll







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