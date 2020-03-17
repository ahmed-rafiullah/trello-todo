const errorHandler = require('./globalErrorHandler')
const AppError = require('./appError')

const {
    idValidator
} = require('./validators')

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

test('should return correct response for non fatal AppError', async () => {
    const res = await errorHandler(new AppError('some message', 200, false))
    expect(res).toEqual({

        fatal: false,
        reponseCode: 200,
        payload: {
            status: 'failed',
            reason: 'some message'
        }

    })
})

test('should return correct response for FATAL AppError', async () => {
    const res = await errorHandler(new AppError('some message', 500, true))
    expect(res).toEqual({

        fatal: true,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'some message'
        }

    })
})

test('error handler should return correct response for joi validation error', async () => {


    const res = await errorHandler(idValidator.validate(-1).error)
    expect(res).toEqual({

        fatal: false,
        reponseCode: 400,
        payload: {
            status: 'failed',
            reason: expect.anything()
        }

    })
})

test('error handler should return correct response for Objection Validation Error of <type> ModelValidation', async () => {


    const res = await errorHandler(new ValidationError({
        statusCode: 1,
        message: 'reason',
        data: 'yes',
        // This can be any string for custom errors. ValidationErrorType is there
        // only to document the default values objection uses internally.
        type: 'ModelValidation'
    }))
    expect(res).toEqual({

        fatal: false,
        reponseCode: 400,
        payload: {
            status: 'failed',
            reason: 'reason'
        }

    })
})

test('error handler should return correct response for Objection Validation Error of <type> RelationExpression', async () => {


    const res = await errorHandler(new ValidationError({
        statusCode: 1,
        message: 'reason',
        data: 'yes',
        // This can be any string for custom errors. ValidationErrorType is there
        // only to document the default values objection uses internally.
        type: 'RelationExpression'
    }))
    expect(res).toEqual({

        fatal: false,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})

test('error handler should return correct response for Objection Validation Error of <type> UnallowedRelation', async () => {


    const res = await errorHandler(new ValidationError({
        statusCode: 1,
        message: 'reason',
        data: 'yes',
        // This can be any string for custom errors. ValidationErrorType is there
        // only to document the default values objection uses internally.
        type: 'UnallowedRelation'
    }))
    expect(res).toEqual({

        fatal: false,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})

test('error handler should return correct response for Objection Validation Error of <type> InvalidGraph', async () => {


    const res = await errorHandler(new ValidationError({
        statusCode: 1,
        message: 'reason',
        data: 'yes',
        // This can be any string for custom errors. ValidationErrorType is there
        // only to document the default values objection uses internally.
        type: 'InvalidGraph'
    }))
    expect(res).toEqual({

        fatal: false,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})

test('error handler should return correct response for Objection Validation Error of <type> unknown i.e default in switch', async () => {


    const res = await errorHandler(new ValidationError({
        statusCode: 1,
        message: 'reason',
        data: 'yes',
        // This can be any string for custom errors. ValidationErrorType is there
        // only to document the default values objection uses internally.
        type: 'unknown'
    }))
    expect(res).toEqual({

        fatal: true,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})



test('error handler should return correct response for ConstraintViolationError', async () => {


    /* TODO: 
        Documentation for native db errors is lacking had to dig into library for this one
        located here todo learn/node_modules/db-errors/lib/errors/DBError.js 
        its takes an object in its constructor not a message as vscode might tell you
        What properties must be present in that object ?
        Here is the link for that documentation
        https://github.com/Vincit/db-errors/blob/d01d36ba1ab21f58b55a72a9fed759999f14db41/index.d.ts#L9
        whatever property is in this link for a particular class just add it as a property inside an object and
        pass it to the constructor like so
            new ConstraintViolationError({
                 name: 'aa',
                nativeError: new Error('f')
            })
        the message in native errror is what you get as the constraintViolationError.message
           
    */
    const res = await errorHandler(new ConstraintViolationError({
        name: 'name',
        nativeError: new Error('message')
    }))
    console.log(res + 'reason')
    expect(res).toEqual({

        fatal: false,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})


test('error handler should return correct response for NotFoundError', async () => {

    const res = await errorHandler(new NotFoundError(1))
    console.log(res + 'reason')
    expect(res).toEqual({

        fatal: false,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})


test('error handler should return correct response for UniqueViolationError', async () => {

    const res = await errorHandler(new UniqueViolationError({
        name: 'name',
        nativeError: new Error('message')
    }))
    console.log(res)
    expect(res).toEqual({

        fatal: false,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})


test('error handler should return correct response for NotNullViolationError', async () => {

    const res = await errorHandler(new NotNullViolationError({
        name: 'name',
        nativeError: new Error('message')
    }))
    console.log(res + 'reason')
    expect(res).toEqual({

        fatal: false,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})


test('error handler should return correct response for ForeignKeyViolationError', async () => {

    const res = await errorHandler(new ForeignKeyViolationError({
        name: 'name',
        nativeError: new Error('message')
    }))
    console.log(res + 'reason')
    expect(res).toEqual({

        fatal: false,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})


test('error handler should return correct response for CheckViolationError', async () => {

    const res = await errorHandler(new CheckViolationError({
        name: 'name',
        nativeError: new Error('message')
    }))
    console.log(res)
    expect(res).toEqual({

        fatal: false,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})


test('error handler should return correct response for DataError', async () => {

    const res = await errorHandler(new DataError({
        name: 'name',
        nativeError: new Error('message')
    }))
    console.log(res)
    expect(res).toEqual({

        fatal: false,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})


test('error handler should return correct response for DBError', async () => {

    const res = await errorHandler(new CheckViolationError({
        name: 'name',
        nativeError: new Error('message')
    }))
    console.log(res)
    expect(res).toEqual({

        fatal: false,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})


test('error handler should return correct response for UNKNWOWN ERROR this should always be fatal', async () => {

    const res = await errorHandler(new Error('hmm'))
    console.log(res)
    expect(res).toEqual({

        fatal: true,
        reponseCode: 500,
        payload: {
            status: 'failed',
            reason: 'Internal Server Error'
        }

    })
})