import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
const router = new Router()

import { logger } from './logger'
import users from './user'
import products from './product'
import { handleShutdown } from './shutdown'
import delay from 'delay'

const app = new Koa();

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World ++';
});

router.get('/about', (ctx, next) => {
    ctx.body = 'This is a boilerplate project.';
});

router.get('/user/:id', users.findById)
router.post('/user', users.create)
router.put('/user/:id', users.update)
router.del('/user/:id', users.delete)
router.get('/users', users.findByConditions)

router.get('/products', products.findAll)

app
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

const server = app.listen(3000);
handleShutdown(server, {
    async onShutdown() {
        await delay(1000*5)
        logger.info('release connection.')
    }
})

logger.info(`server startup, visit http://localhost:3000`)