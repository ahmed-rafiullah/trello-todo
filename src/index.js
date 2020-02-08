require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const todoRoute = require('./controllers/todos');

const app = express();

app.use(morgan('combined'));
// app.use((req,res,next) => {
//     console.log(`$ hehhehehe`)
//     next()
// })
app.use(todoRoute);
app.use(express.static('public'));

// 404
app.use((req, res) => {
  // HTTP status 404: NotFound
  res.status(404).json({
    error: '404 Not Found'
  });
});

// All other errors are handled here
// app.use(())

app.use((err, req, res) => {
  // HTTP status 404: NotFound
  console.log(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.info(`Server has started at ${process.env.SERVER_PORT}`);
});

/*
TODO:

Add validation middleware
Add Linter
Add formatter
Add precommit or pre push hooks to ensure formatting and linting 
Add git hooks for formatter as well
Add Authentication
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
