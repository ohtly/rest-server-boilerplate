import { transports, createLogger, format } from 'winston'
import fs from 'fs'
import watch from 'node-watch'

function getConfig() {
    let contents = fs.readFileSync("log/config.json")
    return JSON.parse(contents)
}

// 开发环境的日志
const transport = new transports.Console()
const devLogger = createLogger(
    {
        transports: [transport],
        format: format.simple()
    })
devLogger.level = getConfig().debug ? 'debug' : 'info'
let setDebug = function (debug) {
    devLogger.level = !debug
}


// 生产环境的日志
const debugTransport = new transports.File({ filename: './log/debug.log', level: 'debug' })
debugTransport.silent = !getConfig().debug

const prodLogger = createLogger(
    {
        transports: [
            new transports.File({ filename: './log/app.log', level: 'info' }),
            new transports.File({ filename: './log/error.log', level: 'warn' }),
            debugTransport
        ],
        format: format.simple()
    })

if (process.env.NODE_ENV == 'production') {
    watch('log/config.json', { recursive: true }, () => {
        debugTransport.silent = !getConfig().debug
    })

    setDebug = function (debug) {
        debugTransport.silent = !debug
        logger.info(`set debug: ${debug}`)
    }
}


let logger = process.env.NODE_ENV == 'production' ? prodLogger : devLogger
export { logger, setDebug }