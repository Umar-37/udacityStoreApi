import { UserStore } from '../../models/user'

const store = new UserStore()

describe('User Model', () => {
    it('should create a user', async () => {
        const result = await store.create({
            username: 'ssmith',
            firstname: 'Sallie',
            lastname: 'Test',
            password: 'password123',
        })
        
        expect(result[0].username).toEqual('ssmith')
    })
    it('should return a list of users', async () => {
        const result = await store.index()
        expect(result.length).toEqual(3)
    })

    it('should return the correct user', async () => {
        const users = await store.index()
        const userId = users[0].id as number

        const result = await store.show(userId+'')
        console.log('kdfjsdkf:',result);
        
        // @ts-ignore
        expect(result[0].username).toEqual('hisaoa')
        
    })

})
