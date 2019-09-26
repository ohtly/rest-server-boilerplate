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
                new transports.File({ filename: './log/error.log', level: 'warn' }),
                debugTransport
            ],
            format: format.simple()
        })

    watch('log/config.json', { recursive: true }, () => {
        debugTransport.silent = !getConfig().debug
    });
}

export { logger }