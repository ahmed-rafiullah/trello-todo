const jwt = require('jsonwebtoken')
const {
    jwtValidator
} = require('../utilities/jwtValidator')
const config = require('../../configs/env/config')
const AppError = require('../utilities/appError')
const checkAuth = async (req, res, next) => {
    const authorizationHeader = req.header('Authorization')
    const token = authorizationHeader.split(' ')[1]
    const isValid = jwt.verify(token, config.security.JWT_SECRET)
    if (isValid === false) {
        // return res.status(401).json({
        //     status: 'failed',
        //     reason: 'Unauthorized'
        // })
        throw new AppError('unauthorized', 401)
    } else {
        // validate jwt and give it to the next middleware
        const decodedToken = jwt.decode(token)
        const validToken = await jwtValidator.validateAsync(decodedToken)

        console.log(validToken)
        req.body._jwt_ = validToken
        next()
    }
}

module.exports = checkAuth