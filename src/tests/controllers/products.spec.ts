import supertest from 'supertest'
import {app} from '../../index'


const request = supertest(app)

describe('test the product controllers: ', () => {
    it('should return a new user after creation', () => {
        const data = {
            name: 'Test',
            price: 40,
            category: 'test category',
        }
        request
            .post('/api/products/create')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({
                id: 1,
                name: 'Test',
                price: '40',
                category: 'test category',
            })
    })

    it('create product should fail if name is\'t included in parameters', () => {
        const data = {
            name: 'Test',
            price: 40,
            category: 'test category',
        }
        request
            .post('/api/products/create')
            .send(data)
            .expect(400)
            .expect({
                error: 'Error: Product name is required',
            })
    })

    it('should return all products', () => {
        request
            .get('/api/products')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                name: 'Test',
                price: 40,
                category: 'test category',
            })
    })

    it('should return product if id specified', () => {
        request
            .get('/api/products/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                name: 'Test',
                price: 40,
                category: 'test category',
            })
    })

    
})
