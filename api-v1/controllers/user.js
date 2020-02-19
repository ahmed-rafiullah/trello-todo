const express = require('express');
const User = require('../models/user')
const userValidator = require('../validators/userValidator')

const router = express.Router();

// create new user
router.post('/', (req, res) => {

  userValidator.validate(req.body).then(hm => {
    const user = {
      fname: req.body.fname,
      lname: req.body.lname,
      password: req.body.password,
      email: req.body.email
    }
    return user
  }).then(user => {
    return User.query().insert(user).then(val => {
      console.log(val)
      res.status(201).json({
        message: 'Created user sucessfully',
        payload: user
      })
    })
  }).catch(err => {
    res.status(400).json({
      error: 'Invalid Request',
      errmsg: err
    })

  })


});


// create all users
router.get('/', (req, res) => {

  User.query().limit(5).then(val => {
    res.status(200).json({
      users: val
    })
  }).catch(err => {
    res.status(400).json({
      error: 'Invalid Request',
      errmsg: err
    })
  })

});


module.exports = router;