import app from './app'
import { handleShutdown } from './shutdown'
import delay from 'delay'
import { logger } from './logger'

const server = app.listen(3000)

handleShutdown(server, {
    async onShutdown() {
        // 模拟一个关闭数据库连接的过程
        await delay(500)
        logger.info('release connection.')
    }
})

logger.info(`server startup, visit http://localhost:3000`)