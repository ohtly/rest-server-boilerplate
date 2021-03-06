import { transports, createLogger, format } from 'winston'
import { config, addConfigChangedHandler } from './config'

// 开发环境的日志
const transport = new transports.Console()
const devLogger = createLogger(
    {
        transports: [transport],
        format: format.simple()
    })
devLogger.level = config.debug ? 'debug' : 'info'
let setDebug = function (debug) {
    devLogger.level = debug ? 'debug' : 'info'
}

// 生产环境的日志
const defaultLogRootPath = './log'
let appLogPath = `${defaultLogRootPath}/app.log`
let errorLogPath = `${defaultLogRootPath}/error.log`
let debugLogPath = `${defaultLogRootPath}/debug.log`

const debugTransport = new transports.File({ filename: debugLogPath, level: 'debug' })
debugTransport.silent = !config.debug

const prodLogger = createLogger(
    {
        transports: [
            new transports.File({ filename: appLogPath, level: 'info' }),
            new transports.File({ filename: errorLogPath, level: 'warn' }),
            debugTransport
        ],
        format: format.simple()
    })

if (process.env.NODE_ENV == 'production') {
    setDebug = function (debug) {
        debugTransport.silent = !debug
        logger.info(`set debug: ${debug}`)
    }
}

// 通用设置
let logger = process.env.NODE_ENV == 'production' ? prodLogger : devLogger
addConfigChangedHandler(config => {
    logger.info(`已重新加载日志`)
    setDebug(config.debug)
})

export { logger, setDebug }