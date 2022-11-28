import supertest from 'supertest'
import {app} from '../../index'
import { getToken } from '../../handlers/auther'


const request = supertest(app)
const token: string = getToken({username:'hisaoa',password:'1234'})


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
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
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
