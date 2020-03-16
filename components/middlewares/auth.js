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
    const authorizationHeader = req.header('Authorization')
    const token = authorizationHeader.split(' ')[1]
    const isValid = jwt.verify(token, config.security.JWT_SECRET)
    if (isValid === false) {
        throw new AppError('unauthorized', 401)
    } else {
        // validate jwt and give it to the next middleware
        const decodedToken = jwt.decode(token)
        const validToken = await jwtValidator.validateAsync(decodedToken)
        req.body._jwt_ = validToken
        next()
    }
}

module.exports = checkAuth