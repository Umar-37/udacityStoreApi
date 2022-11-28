import { OrderStore } from '../../models/order'
import { ProductStore } from '../../models/product'
import { UserStore } from '../../models/user'

const store = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()
let productId: number, userId: number

describe('Order Model', () => {
    beforeAll(async () => {
        const product = await productStore.create({
            name: 'Superman underroos',
            price: "40",
            category: 'Underwear',
        })
        productId = product.id as number
        const user = await userStore.create({
            username: 'ssmith',
            firstname: 'Sallie',
            lastname: 'Test',
            password: 'password123',
        })
        userId = user.id as number
    })

    // afterAll(async () => {
    //     await productStore.deleteProduct(productId)
    //     await userStore.deleteUser(userId)
    // })

    it('should create an order', async () => {
        const result = await store.create({

            products: [{
                quantity: 10,
                product_id:1 
            }],
            user_id: 1,
            status: true,
        })
        expect(result).toEqual({
            id: 1,
            products: [{
                product_id: 1,
                quantity: 10
            }],
            user_id: 1,
            status: true,
        })
    })

    it('should return a list of orders', async () => {
        const result = await store.index()
        expect(result).toEqual([
            {
                id: 1,
                products: [{
                    product_id: 1,
                    quantity: 10
                }],
                user_id: 1,
                status: true,
            },
        ])
    })

    it('should return the correct order', async () => {
        const result = await store.show(1+'')
        expect(result).toEqual({
            id: 1,products: [{
                    product_id: 1,
                    quantity: 10
                }],
            user_id: 1,
            status: true,
        })
    })

})
