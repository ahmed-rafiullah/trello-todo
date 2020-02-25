const express = require('express');
const User = require('../models/user')
const {
  userRegisterValidator,
  userLoginValidator,
  userPasswordChangeValidator
} = require('../validators/userValidators')
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const protectResource = require('./auth')
const saltRounds = 10

// register a new user 
router.post('/register', async (req, res) => {
  try {
    let user = await userRegisterValidator.validateAsync(req.body)
    const password = await bcrypt.hash(user.password, saltRounds)
    console.log(user)
    const emailExists = await User.query().select('email').where('email', user.email).limit(1)
    if (emailExists.length > 0) {
      return res.status(200).json({
        status: 'fail',
        reason: 'email is already taken'
      })
    } else {
      user.password = password
      await User.query().insert(user)
      res.status(201).json({
        status: 'success',
        message: 'user registered successfully'
      })
    }

  } catch (err) {
    console.log(err)
    res.status(422).json({
      status: 'failed',
      reason: err.message
    })
  }

});


// login user
router.post('/login', async (req, res) => {
  try {

    const user = await userLoginValidator.validateAsync(req.body)
    const doesUserExist = await User.query().select().where({
      email: user.email
    })

    // no user or email
    if (doesUserExist.length === 0) {
      return res.status(200).json({
        status: 'fail',
        reason: 'user name or password is incorrect'
      })
    }

    // user does exist
    const passwordCheck = await bcrypt.compare(user.password, doesUserExist[0].password)

    if (passwordCheck === false) {
      return res.status(200).json({
        status: 'fail',
        reason: 'user name or password is incorrect'
      })
    }

    // user password is correct generate the jwt
    const jwtToken = jwt.sign({
      xid: doesUserExist[0].user_id,
      name: `${doesUserExist[0].fname} ${doesUserExist[0].lname}`,
      email: doesUserExist[0].email
    }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    // return response with jwt token

    res.status(200).json({
      status: 'success',
      result: 'login successful',
      access_token: jwtToken
    })
  } catch (err) {
    console.log(err)
    res.status(422).json({
      status: 'failed',
      reason: err.message
    })
  }


});


// change password belonging to current user
router.post('/change-password', protectResource, async (req, res) => {
  try {
    const userID = req.body._jwt_.xid
    // validate payload
    const reset_password = await userPasswordChangeValidator.validateAsync(req.body, {
      stripUnknown: true
    })

    console.log(reset_password)
    // check if user even exists !
    const user = (await User.query().select('user_id', 'password').where('user_id', userID).limit(1))[0]
    // no user exists exit
    if (typeof user === 'undefined') {
      return res.status(400).json({
        status: 'failed',
        reason: 'user no longer exists'
      })
    }


    const passwordCheck = await bcrypt.compare(reset_password.old_password, user.password)
    if (passwordCheck === false) {
      return res.status(400).json({
        status: 'failed',
        reason: 'incorrect password'
      })
    }

    // check if both new and new again passwords match
    if (reset_password.new_password_again !== reset_password.new_password) {
      return res.status(400).json({
        status: 'failed',
        reason: 'new passwords must match'
      })
    }


    // check if old password and new passwords match 
    if (reset_password.old_password === reset_password.new_password ||
      reset_password.old_password === reset_password.new_password_again) {
      return res.status(401).json({
        status: 'failed',
        reason: 'new password cannot be same as old password'
      })
    }

    // password checks completed user is allowed to change their password
    console.log(user)
    // hash the new password
    const new_password = await bcrypt.hash(reset_password.new_password, saltRounds)

    //https://vincit.github.io/objection.js/api/query-builder/mutate-methods.html#insertwithrelatedandfetch
    // update it
    const passwordUpdated = await User.query().patch({
      password: new_password,
    }).findById(userID)

    // if updated
    if (passwordUpdated === 1) {
      res.status(200).json({
        status: 'success',
        result: 'password changed'
      })
    } else {
      // other wise something went wrong
      res.status(500).json({
        status: 'failed',
        result: 'Internal server error'
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: 'failed',
      result: 'Internal server error'
    })
  }
});


// TODO: Add Deactivate or Delete account wont be needed for myjobportal
// TODO: Add forgot password that will be need for myjobportal
// TODO: Add centralized error handling 


module.exports = router;