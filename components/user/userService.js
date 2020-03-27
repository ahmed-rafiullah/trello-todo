const bcrypt = require('bcrypt')
const {
  AppError
} = require('../utilities')
const jwt = require('jsonwebtoken')
const { env: config } = require('../../configs')

class UserService {
  // pass the user model
  constructor (UserModel) {
    this.UserModel = UserModel
  }

  async registerUser ({ body, userRegisterValidator }) {
    const user = await userRegisterValidator.validateAsync(body)
    const emailExists = await this.UserModel.query().select('email').where('email', user.email).limit(1)
    if (emailExists.length > 0) {
      throw new AppError('email already exists', 400)
    } else {
      user.password = await bcrypt.hash(user.password, config.security.SALT_ROUNDS) // if this is removed the plaintext password will saved in db
      const result = await this.UserModel.query().insert(user)
      delete result.password // if this removed then the encrypted password will be leaked
      return result
    }
  }

  async changePassword ({ body, userPasswordChangeValidator }) {
    const userID = body._jwt_.xid
    // validate payload
    const user = (await this.UserModel.query().select('user_id', 'password').where('user_id', userID).limit(1))[0]
    const resetPassword = await userPasswordChangeValidator.validateAsync(body, {
      stripUnknown: true
    })

    if (user === undefined) {
      throw new AppError('user no longer exists', 404)
    }

    const passwordCheck = await bcrypt.compare(resetPassword.old_password, user.password)
    if (passwordCheck === false) {
      throw new AppError('incorrect password', 400)
    }

    // check if both new and new again passwords match
    if (resetPassword.new_password_again !== resetPassword.new_password) {
      throw new AppError('new passwords must match', 400)
    }

    // check if old password and new passwords match
    if (resetPassword.old_password === resetPassword.new_password ||
      resetPassword.old_password === resetPassword.new_password_again) {
      throw new AppError('new password cannot be same as old password', 400)
    }

    const newPassword = await bcrypt.hash(resetPassword.new_password, config.security.SALT_ROUNDS)
    const passwordUpdated = await this.UserModel.query().patch({
      password: newPassword
    }).findById(userID)

    return passwordUpdated
  }

  async loginUser ({ body, userLoginValidator }) {
    const user = await userLoginValidator.validateAsync(body)
    const doesUserExist = await this.UserModel.query().select().where({
      email: user.email
    })

    if (doesUserExist.length === 0) {
      throw new AppError('email or password is incorrect', 401)
    }

    const passwordCheck = await bcrypt.compare(user.password, doesUserExist[0].password)
    if (passwordCheck === false) {
      throw new AppError('email or password is incorrect', 401)
    }

    const jwtToken = jwt.sign({
      xid: doesUserExist[0].user_id,
      name: `${doesUserExist[0].fname} ${doesUserExist[0].lname}`,
      email: doesUserExist[0].email
    }, config.security.JWT_SECRET, {
      expiresIn: '1h'
    })
    // the json response shape is responsibility of the router
    return jwtToken
  }
}

module.exports = UserService
