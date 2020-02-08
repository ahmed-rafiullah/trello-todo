const express = require('express');
const sequelize = require('../db');

const router = express.Router();
// get all todos or query todos
router.get('/todos', (req, res) => {
  // if(req.query){
  //     res.send(req.query)
  // }
  sequelize
    .authenticate()
    .then(() => {
      res.send('heheheh');
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      res.send('heheheh');
      console.error('Unable to connect to the database:', err);
    });
});

// get a single todo
router.get('/todos/:id', (req, res) => {
  res.send(`${req.params.id}`);
});

// delete todo
router.delete('/todos', (req, res) => {
  res.send('heheheh');
});

// update todo
router.put('/todos', (req, res) => {
  res.send('heheheh');
});

// create new todo
router.post('/todos', (req, res) => {
  res.send('heheheh');
});

// create new todo
router.get('/error', () => {
  throw new Error('Exception fked');
});

module.exports = router;
