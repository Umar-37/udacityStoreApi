import supertest from 'supertest'
import {app} from '../../index'


const request = supertest(app)


describe('test the users controllers: ', () => {
    it('/users/create should return a user', () => {
        const data = {
            username: 'ssmith',
            first_name: 'Sally',
            last_name: 'Smothers',
            password: 'test1234',
        }
        request
            .post('/api/users/create')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                username: 'ssmith',
                first_name: 'Sally',
                last_name: 'Smothers',
            })
    })

    it('/users/create should fail if username is\'t sent', () => {
        const data = {
            first_name: 'Sally',
            last_name: 'Smothers',
            password: 'test1234',
        }
        request
            .post('/api/users/create')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'Missing username or password',
            })
    })

    it('/users/create should fail if required password is\'t sent', () => {
        const data = {
            username: 'ssmith',
            first_name: 'Sally',
            last_name: 'Smothers',
        }
        request
            .post('/api/users/create')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'Missing username or password',
            })
    })

    it('/users should return all users', () => {
        request
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect([
                {
                    id: 1,
                    username: 'ssmith',
                    first_name: 'Sally',
                    last_name: 'Smothers',
                },
            ])
    })

    it('/users/:id should return user', () => {
        request
            .get('/api/users/1')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                first_name: 'Sally',
                last_name: 'Smothers',
                password_digest: 'test1234',
            })
    })

})
