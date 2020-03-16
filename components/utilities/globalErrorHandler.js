// handles all errors from entire app and checks wether error is fatal or recoverable
// all logging is done here
// if fatal restart the application other wise respond to error i.e send to mail

const logger = require('../../configs/logging/winston')

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
            status: 'failedd',
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

    } else if (err instanceof Objection.ValidationError) {
        // https://vincit.github.io/objection.js/recipes/error-handling.html#examples
        // handles all objection related errors
        switch (err.type) {
            case 'ModelValidation':
                return response(err.message, 400)
                break;
            case 'RelationExpression':
                return response('Internal Server Error', 500)
                break;
            case 'UnallowedRelation':
                return response('Internal Server Error', 500)
                break;
            case 'InvalidGraph':
                return response('Internal Server Error', 500)
                break;
            default:
                // UnknownValidationError
                return response('Internal Server Error', 500)
                break;
        }
    } else if (err instanceof NotFoundError) {
        return response(err.message, 404)
    } else if (err instanceof UniqueViolationError) {
        return response(err.message, 400)
    } else if (err instanceof NotNullViolationError) {
        return response(err.message, 400)
    } else if (err instanceof ForeignKeyViolationError) {
        return response('Internal Server Error', 500)
    } else if (err instanceof CheckViolationError) {
        return response('Internal Server Error', 500)
    } else if (err instanceof DataError) {
        return response('Internal Server Error', 500)
    } else if (err instanceof DBError) {
        return response('Internal Server Error', 500)
    } else {
        // unknown error cannot determine if fatal so we set it as fatal by default
        return response('Internal Server Error', 500, true)

    }

}

module.exports = errHandle