import { transports, createLogger, format } from 'winston'
import fs from 'fs'
import watch from 'node-watch'

let logger

function getConfig() {
    let contents = fs.readFileSync("log/config.json")
    return JSON.parse(contents)
}

if (process.env.NODE_ENV == 'development') {
    const transport = new transports.Console()
    logger = createLogger(
        {
            transports: [transport],
            format: format.simple()
        })
    logger.level = getConfig().debug ? 'debug' : 'info'

}

if (process.env.NODE_ENV == 'production') {
    const debugTransport = new transports.File({ filename: './log/debug.log', level: 'debug' })
    debugTransport.silent = !getConfig().debug

    logger = createLogger(
        {
            transports: [
                new transports.File({ filename: './log/app.log', level: 'info' }),
                new transports.File({ filename: './log/error.log', level: 'error' }),
                debugTransport
            ],
            format: format.simple()
        })

    watch('log/config.json', { recursive: true }, () => {
        debugTransport.silent = !getConfig().debug
    });
}

// function getConfig() {
//     let contents = fs.readFileSync("log/config.json")
//     return JSON.parse(contents)
// }

// let setLoggerLevel
// let debugTransport


// const transportList = [
// ]

// if (process.env.NODE_ENV == 'development') {
//     debugTransport = new transports.Console()
//     transportList.push(debugTransport)
//     setLoggerLevel = function (config) {
//         if (config.debug) {
//             debugTransport.level = 'debug'
//         } else {
//             debugTransport.level = 'info'
//         }
//     }
// }

// if (process.env.NODE_ENV == 'production') {
//     transportList.push(new transports.File({ filename: './log/error.log', level: 'error' }))
//     transportList.push(new transports.File({ filename: './log/app.log', level: 'info' }))
// }


// const logger = createLogger(
//     {
//         transports: transportList,
//         format: format.simple()
//     })

// setLoggerLevel(logger, getConfig())

// watch('log/config.json', { recursive: true }, function (event, name) {
//     setLoggerLevel(logger, getConfig())
// });

export { logger }