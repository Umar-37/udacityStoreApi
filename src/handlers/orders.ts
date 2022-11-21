import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
const order_routes = express()

const store = new OrderStore()
const checkNan = (num: unknown): boolean => isNaN(num as number) || num as number <= 0 || num as number <= 0

const index = async (_req: Request, res: Response) => {
      try {
            const  orders= await store.index()
            console.log('in the index');
            res.json(orders)
      } catch (err) {
            res.status(400).json(err)

      }


}
const show = async (req: Request, res: Response) => {
      try {
            if (checkNan(req.params.id)) {
            res.status(400).json('only positve numbers are allowd')
            return ;
            }
            const order = await store.show(req.params.id)
            console.log('in the show');
            res.json(order)
      }
      catch (err) {
            console.log(err);
            res.status(400)
            .json(err)
            
      }
}
const create = async (req: Request, res: Response) => {
      try {
            console.log('\ntriggerd');

            const order: Order = {
                  products: req.body.products,
                  status: req.body.status,
                  user_id: req.body.user_id,
                  //since the id is autoincrement we dont need it right now
                  //id:req.body.id
            }
            console.log('in the handler,products info is :');
            console.dir(order);
            
            

            let property: keyof Order;
            for (property in order) {
                  //check if the filds are not empty
                  if (order[property] == undefined || order[property]?.toString().trim() == ""|| checkNan(order.products[0].product_id)|| checkNan(order.products[0].quantity)) {
                        res.status(400).json("filds are't fill field, or some of it are empty")
                        return false;
                  }
            }
            const newProduct = await store.create(order)
            console.log('is:', req.body);
            res.json(newProduct)

      } catch (err) {
            console.log(err);
            res.status(400)
            .json(err)
      }

}
// const remove = async (req: Request, res: Response) => {
//       try {
//             console.log('\nin remove');

//             if (checkNan(req.params.id)) {
//                   res.status(400).send('only positve numbers are allowd')
//                   return false;
//             }

//             const deleteProduct = await store.remove(req.params.id)
//             console.log('the deleling weapon is:', deleteProduct);

//             res.json(deleteProduct)

//       } catch (err) {
//             res.status(400)
//             res.json(err)
//       }

// }
order_routes.get('/orders', index)
order_routes.get('/orders/:id', show)
order_routes.post('/orders/create', create)
//order_routes.delete('/orders/:id', remove)
//mythical_weapon_routes.delete('/remove/:id',remove)

export default order_routes;
