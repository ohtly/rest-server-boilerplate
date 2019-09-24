const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body')
const router = new Router();

const users = require('./user')

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

app
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);