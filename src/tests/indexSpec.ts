import {UserStore} from '../models/user'

const store=new UserStore();

describe('/user store model', ()=> {

      it('should have an index method',  ():void => {
            expect(store.index).toBeDefined()
      })

      it('index method should return a list of products', async () => {
            const result=await store.index();
            expect(result.length).toEqual(1)
      })

})
