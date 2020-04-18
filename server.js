const {
  dbCheckConnection
} = require('./configs')

const {
  env: config
} = require('./configs')

const {
  app
} = require('./app')

// if database is connected then run server
dbCheckConnection().then(() => {
  console.log('database connected')
  app.listen(config.server.SERVER_PORT, () => {
    // check for db connectivity if non exit process
    console.info(`Server has started at ${config.server.SERVER_PORT} in environment {${process.env.NODE_ENV}}`)
    // config objection
  })
})
