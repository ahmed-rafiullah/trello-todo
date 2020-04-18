const jwt = require('jsonwebtoken')

const {
  jwtValidator
} = require('../utilities')

const {
  env: config
} = require('../../configs')

const {
  AppError
} = require('../utilities')

const checkAuth = async (req, res, next) => {
  try {
    const authorizationHeader = req.header('Authorization')
    if (authorizationHeader === undefined) {
      throw new AppError('no authorization header present', 400)
    }
    const token = authorizationHeader.split(' ')[1]
    const isValid = jwt.verify(token, config.security.JWT_SECRET)
    if (isValid === false) {
      throw new AppError('unauthorized', 401)
    } else {
    // validate jwt and give it to the next middleware
      const decodedToken = jwt.decode(token)
      const validToken = await jwtValidator.validateAsync(decodedToken)
      req.body._jwt_ = validToken

      // Object.defineProperty(req.body, '_jwt_', { // make sure its not overwritten any where
      //   writable: false
      // })

      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = checkAuth
