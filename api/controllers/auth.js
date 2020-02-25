const jwt = require('jsonwebtoken')
const {
    jwtValidator
} = require('../validators/jwtValidator')
const checkAuth = async (req, res, next) => {


    try {
        const authorizationHeader = req.header('Authorization')
        const token = authorizationHeader.split(' ')[1]
        const isValid = jwt.verify(token, process.env.JWT_SECRET)
        if (isValid === false) {
            return res.status(401).json({
                status: 'failed',
                reason: 'Unauthorized'
            })
        } else {
            // validate jwt and give it to the next middleware
            const decodedToken = jwt.decode(token)
            const validToken = await jwtValidator.validateAsync(decodedToken)

            console.log(validToken)
            req.body._jwt_ = validToken
            next()
        }

    } catch (err) {
        console.log(err)
        return res.status(401).json({
            status: 'failed',
            reason: 'Unauthorized'
        })
    }

}

module.exports = checkAuth