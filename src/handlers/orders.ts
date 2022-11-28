import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'


const order_routes = express()

const store = new OrderStore()
const checkNan = (num: unknown): boolean => isNaN(num as number) || num as number <= 0 || num as number <= 0

const index = async (_req: Request, res: Response) => {
      try {
            const  orders= await store.index()
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

            const order: Order = {
                  products: req.body.products,
                  status: req.body.status,
                  user_id: req.body.user_id,
                  //since the id is autoincrement we dont need it right now
                  //id:req.body.id
            }
            
            

            let property: keyof Order;
            for (property in order) {
                  //check if the filds are not empty
                  if (order[property] == undefined || order[property]?.toString().trim() == ""|| checkNan(order.products[0].product_id)|| checkNan(order.products[0].quantity)) {
                        res.status(400).json("filds are't fill field, or some of it are empty")
                        return false;
                  }
            }
            const newProduct = await store.create(order)
            
            res.json(newProduct)

      } catch (err) {
            console.log(err);
            res.status(400)
            .json(err)
      }

}

order_routes.get('/orders', index)
order_routes.get('/orders/:id', show)
order_routes.post('/orders/create', create)

export default order_routes;
