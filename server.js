const {
    knex,
    dbCheckConnection
} = require('./configs/db/db')

const config = require('./configs/env/config')

const {
    Model
} = require('objection');


const {
    app
} = require('./app')


// if database is connected then run server
dbCheckConnection().then(() => {
    console.log('database connected')
    Model.knex(knex);
    app.listen(config.server.SERVER_PORT, () => {
        // check for db connectivity if non exit process
        console.info(`Server has started at ${config.server.SERVER_PORT}`);
        // config objection

    });
})