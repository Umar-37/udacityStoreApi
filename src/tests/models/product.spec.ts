import { ProductStore } from '../../models/product'

const store = new ProductStore()
const theProduct={
            id: 1,
            name: 'Test product',
            price: '40',
            category:"test category"
        }
describe('Product Model', () => {
    it('should create a product', async () => {
        const result = await store.create(theProduct)
        expect(result).toEqual([{
            id: 2,
            name: 'Test product',
            price: 40
        }])
    })

    it('should return a list of products', async () => {
        const result = await store.index()

        expect(result).toEqual([
            // @ts-ignore
            { id: 1, name: 'Superman underroos', price: 40 },
            // @ts-ignore
            { id: 2, name: 'Test product', price: 40 }
          ])
    })

    it('should return the correct product', async () => {
        const result = await store.show(1+'')
            // @ts-ignore
        expect(result).toEqual([{
            id: 1,
            name: 'Superman underroos',
            // @ts-ignore
            price: 40
        }])
    })

})
