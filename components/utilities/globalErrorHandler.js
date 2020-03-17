// handles all errors from entire app and checks wether error is fatal or recoverable
// all logging is done here
// if fatal restart the application other wise respond to error i.e send to mail

const {
    logger
} = require('../../configs')

const {
    ValidationError,
    NotFoundError,
    DBError,
    ConstraintViolationError,
    UniqueViolationError,
    NotNullViolationError,
    ForeignKeyViolationError,
    CheckViolationError,
    DataError
} = require('objection');
const AppError = require('./appError')

function response(message, httpCode, fatal = false) {
    return {
        fatal: fatal,
        reponseCode: httpCode,
        payload: {
            status: 'failed',
            reason: message
        }
    }
}

// here i handle my app errors and any other error
async function errHandle(err) {
    logger.error('', err)
    if (err instanceof AppError) {
        // determine response payload here
        if (err.fatal === true) {
            return response(err.message, 500, err.fatal)
        } else {
            return response(err.message, err.httpCode)
        }

    } else if (err.isJoi === true) {
        // https://hapi.dev/family/joi/api/?v=17.1.0#errors
        // handle joi errors
        return response(err.message, 400)

    } else if (err instanceof ValidationError) {
        // https://vincit.github.io/objection.js/recipes/error-handling.html#examples
        // handles all objection related errors
        switch (err.type) {
            case 'ModelValidation':
                return response(err.message, 400)
            case 'RelationExpression':
                return response('Internal Server Error', 500)
            case 'UnallowedRelation':
                return response('Internal Server Error', 500);
            case 'InvalidGraph':
                return response('Internal Server Error', 500)
            default:
                // UnknownValidationError
                return response('Internal Server Error', 500, true)
        }
    } else if (err.constructor.name === "ConstraintViolationError") {
        return response('Internal Server Error', 500)
    } else if (err.constructor.name === "NotFoundError") {
        return response('Internal Server Error', 500)
    } else if (err.constructor.name === "UniqueViolationError") {
        return response('Internal Server Error', 500)
    } else if (err.constructor.name === "NotNullViolationError") {
        return response('Internal Server Error', 500)
    } else if (err.constructor.name === "ForeignKeyViolationError") {
        return response('Internal Server Error', 500)
    } else if (err.constructor.name === "CheckViolationError") {
        return response('Internal Server Error', 500)
    } else if (err.constructor.name === "DataError") {
        return response('Internal Server Error', 500)
    } else if (err.constructor.name === "DBError") {
        return response('Internal Server Error', 500)
    } else {
        // unknown error cannot determine if fatal so we set it as fatal by default
        return response('Internal Server Error', 500, true)
    }

}

module.exports = errHandle