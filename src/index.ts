import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import user_routes from './handlers/users'
import product_routes from './handlers/products'
import order_routes from './handlers/orders'

export const app = express()
app.use(bodyParser.json())

app.get('/status', (request: Request, response: Response) => {
      response.status(200).end('<h1>hello</h1>')
})
app.use('/',user_routes)
app.use('/',product_routes)
app.use('/',order_routes)

app.listen(3000, () => {
      console.log('\n listening to http://localhost:' + 3000)
})
