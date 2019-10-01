import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
const router = new Router()

import users from './user'
import products from './product'

const app = new Koa();

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World';
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

export default app

