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

const internalServerError = 'Internal Server Error'
// https://vincit.github.io/objection.js/recipes/error-handling.html#examples
function objectionErrorHandler(err) {
    if (err instanceof ValidationError) {
        return {
            status: 'failed',
            reason: internalServerError
        }
    } else if (err instanceof NotFoundError) {
        res.status(404).send({
            message: err.message,
            type: 'NotFound',
            data: {}
        });
    } else if (err instanceof UniqueViolationError) {
        res.status(409).send({
            message: err.message,
            type: 'UniqueViolation',
            data: {
                columns: err.columns,
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof NotNullViolationError) {
        return {
            status: 500,
            error: internalServerError
        }
    } else if (err instanceof ForeignKeyViolationError) {
        return {
            status: 500,
            error: internalServerError
        }
    } else if (err instanceof CheckViolationError) {
        return {
            status: 500,
            error: internalServerError
        }
    } else if (err instanceof DataError) {
        return {
            status: 500,
            error: internalServerError
        }
    } else if (err instanceof DBError) {
        return {
            status: 500,
            error: internalServerError
        }
    } else {
        return {
            status: 500,
            error: internalServerError
        }
    }
}


module.exports = errorHandler