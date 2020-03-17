const winston = require('winston')
require('winston-daily-rotate-file')
const appRoot = require('app-root-path')
const config = require('../env/config')




//s


const globalTransportFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.errors({
        stack: true
    })

)

const errorFileTransport = new winston.transports.DailyRotateFile({
    filename: `${appRoot}/logs/error.log`,
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    maxSize: '100m',
    maxFiles: '1',
    format: globalTransportFormat
});


// - Write to all logs with level `info` and below to `combined.log` 
const combinedFileTransport = new winston.transports.DailyRotateFile({
    filename: `${appRoot}/logs/combined.log`,
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    maxSize: '100m',
    maxFiles: '1',
    format: globalTransportFormat
});

const consoleTransportFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.errors({
        stack: true
    }),
    winston.format.simple(),
)
const logger = winston.createLogger({
    level: 'info',
    defaultMeta: {
        service: 'todo-app-core'
    },
    transports: [
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`
        errorFileTransport,
        combinedFileTransport
    ]
});


// If we're not in production then log to the `console`

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: consoleTransportFormat
    }));
}


module.exports = logger