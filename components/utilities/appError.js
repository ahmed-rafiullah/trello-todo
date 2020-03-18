class AppError extends Error {
  /**
     * AppError extends the base Error object
     *
     * Takes the description of the error i.e the message,
     * http code of the error to send back to client IFF not fatal,
     * if fatal is set to true the entire server is shutdown and restarted
     * so make sure you use it only when you are absolutely sure the error is really actually
     * fatal
     */
  constructor (message, httpCode, fatal = false) {
    super(message)
    this.message = message
    this.httpCode = httpCode
    this.fatal = fatal
    console.log(this)

    // to attach the .stack property that contains the stack trace
    // the second argument is to not show the AppError constuctor in the
    // stack trace
    Error.captureStackTrace(this, AppError)
  }
}

module.exports = AppError
