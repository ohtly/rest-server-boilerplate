import app from '../src/app'
import assert from 'assert'
import supertest from 'supertest'

describe('restful service test', function () {
    let server = {}
    let request = {}

    before(() => { server = app.listen(3000) })
    after(() => {
        server.close()
    })

    beforeEach(() => {
        request = supertest.agent(server)
    })

    describe('root', () => {
        it('get hello world /', async () => {
            await request.get('/').expect(200, 'Hello World')
        })
    })

    describe('user', () => {
        it('get user /:id', async () => {
            let response = await request.get('/user/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/).expect(200)
            assert(response.body.name, 'Joe')
        })
    })
})