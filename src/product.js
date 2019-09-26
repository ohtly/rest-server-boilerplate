import { logger } from './logger'

export default {
    findAll(ctx) {
        logger.debug('open db .. ok')
        logger.debug('run query ..')
        logger.error('query error, can not find table products')
        ctx.body = {
            code: 500,
            message: 'query error, can not find table products'
        }
        ctx.status = 500
    }
}