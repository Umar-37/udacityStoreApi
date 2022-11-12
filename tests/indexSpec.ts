import {MythicalWeaponStore} from '../src/models/mythical_weapon'

const store=new MythicalWeaponStore();

describe('/mythical weapon model', ()=> {

      it('should have an index method',  ():void => {
            expect(store.index).toBeDefined()
      })

      it('index method should return a list of products', async () => {
            const result=await store.index();
            expect(result).toEqual([])
      })

})
