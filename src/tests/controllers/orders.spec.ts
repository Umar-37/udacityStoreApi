import supertest from 'supertest'
import {app} from '../../index'
import { getToken } from '../../handlers/auther'

const request = supertest(app)
const token: string = getToken({username:'hisaoa',password:'1234'})

describe('test the Orders controllers: ', () => {
    it('/orders/create should create and  return new order ', () => {
        const data = {
            user_id: 1,
            status: 'true',
        }
        request
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                user_id: 1,
                status: 'true',
            })
    })

    it('orders/add-product/:id should add product to the specific order', () => {
        const data = {
            product_id: 1,
            quantity: 10,
        }
        request
            .post('/api/orders/add-product/1')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                order_id: 1,
                product_id: 1,
                quantity: 10,
            })
    })

    it('/orders/create should fail if user_id is not included in parameters', () => {
        const data = {
            status: 'new',
        }
        request
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(400)
            .expect({
                error: 'Missing one or more required parameters',
            })
    })

    it('/orders/create should fail if status is not included in parameters', () => {
        const data = {
            user_id: 1,
        }
        request
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(400)
            .expect({
                error: "filds are't fill field, or some of it are empty",
            })
    })

    it('/orders should return all orders', () => {
        request
            .get('/api/orders')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                user_id: 1,
                status: true,
            })
    })

    it('/orders/:id return order', () => {
        request
            .get('/api/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                user_id: 1,
                status: true,
            })
    })

    it('/orders/current-order/:id should return orders with true status', () => {
        request
            .get('/api/orders/current-order/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                user_id: 1,
                status: true,
            })
    })
})
