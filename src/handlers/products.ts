import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import { checkAuth, getToken } from "./auther"


const product_routes = express()

const store = new ProductStore()
const checkNan = (num: unknown): boolean => isNaN(num as number) || num as number <= 0 || num as number <= 0

const index = async (_req: Request, res: Response) => {
      try {
            const  products= await store.index()
            res.json(products)
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
            const product = await store.show(req.params.id)
            res.json(product)
      }
      catch (err) {
            console.log(err);
            res.status(400)
            .json(err)
            
      }
}
const create = async (req: Request, res: Response) => {
      try {

            const product: Product = {
                  name: req.body.name,
                  price: req.body.price,
                  //since the id is autoincrement we dont need it right now
                  //id:req.body.id
            }

            let property: keyof Product;
            for (property in product) {
                  //check if the filds are not empty
                  if (product[property] == undefined || product[property]?.toString().trim() == "") {
                        res.status(400).json("filds are't fill field, or some of it are empty")
                        return false;
                  }
            }
            const newProduct = await store.create(product)
            res.json(newProduct)

      } catch (err) {
            console.log(err);
            res.status(400)
            .json(err)
      }

}

product_routes.get('/products', index)
product_routes.get('/products/:id', show)
product_routes.post('/products/create',checkAuth, create)

export default product_routes;
