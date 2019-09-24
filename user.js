module.exports = {
    findById: function (ctx) {
        let { id } = ctx.params
        const result = {
            id: parseInt(id),
            name: 'Joe'
        }
        ctx.body = result
    },
    create: function (ctx) {
        let { name } = ctx.request.body
        console.log(`create user name is ${name}`)
        ctx.body = {
            message: 'create success'
        }
        ctx.status = 201
    },
    update: function (ctx) {
        let { id } = ctx.params
        let { name } = ctx.request.body
        console.log(`id: ${id} user name update with ${name}`)
        ctx.body = {
            message: 'update success'
        }
        ctx.status = 202
    },
    delete: function (ctx) {
        let { id } = ctx.params
        console.log(`id: ${id} user deleted.`)
        ctx.body = {
            message: 'delete success'
        }
        ctx.status = 202
    },
    findByConditions: function (ctx) {
        let { city, start = 0, offset = 10 } = ctx.request.query
        ctx.body = {
            conditions: {
                city,
                start,
                offset
            }
        }
    }
}