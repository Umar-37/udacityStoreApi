import client from "../database";
import bcrypt from "bcrypt"

export type OrderProduct = {
    product_id: number;
    quantity: number;
}

export type Order = {
    products: OrderProduct[];
    id?: number;
    user_id: number;
    status: boolean;
}
const pepper:string=process.env.BCRYPT_PASSWORD as string
const saltRounds:string=process.env.SALT_ROUNDS as string


export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'
            const {rows} = await conn.query(sql)
            const orderProducts = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)"
      const orders = []

      for (const order of rows) {
        const {rows: orderProductRows} = await conn.query(orderProducts, [order.id])
        orders.push({
          ...order,
          products: orderProductRows
        })
      }
            conn.release()

            return orders 
        } catch (err) {
            throw new Error(`Error happen while fetching orders :${err}`);

        }
    }
    async show(id: string): Promise<Order> {
        try {
            const conn = await client.connect()
            const sql = `SELECT * FROM orders WHERE id=${id}`
            const result = await conn.query(sql)
            const order=result.rows[0]
            const orderProducts = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)"
            const {rows: orderProductRows} = await conn.query(orderProducts, [id])

            conn.release()

            //return result.rows
            return {
                ...order,
                products: orderProductRows
              }
        } catch (err) {
            throw new Error(` user does't exist :${err}`);

        }
    }
    async create(order: Order): Promise<Order>{
            console.log("in create", order);
            const conn = await client.connect()
            const sql = "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *"
        try {
                const result =  await conn.query(sql, [order.user_id,order.status] )
                const rows=result.rows
                console.log('the first one in create is working:',rows);
                
                const theOrder:Order=rows[0];
                console.log('the theOrder is:',theOrder);
                

      const orderProductsSql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity"
      const orderProducts = []
            //console.log('reult is:', result);
            for (const product of order.products) {
                console.log('inside the loop:',product);
                console.log('inside the loop2:',order.id);
                
                const {product_id, quantity} = product
        
                const {rows} = await conn.query(orderProductsSql, [theOrder.id, product_id, quantity])
        
                orderProducts.push(rows[0])
              }

            conn.release()
            return {
                ...theOrder,
                products: orderProducts
              }

        } catch (err) {
            throw new Error(`Cloud't create the user :${err}`);

        }
    }
    // async remove(id: string): Promise<User> {
    //         const conn = await client.connect()
    //     try {
    //         const deleted =this.show(id)
    //         const conn = await client.connect()
    //         const sql = `DELETE FROM users WHERE id=${id}`
    //         const result = await conn.query(sql)
    //         console.log('result is :',result);
            
    //         //return result.rows
    //         return deleted 
    //     } catch (err) {
    //         throw new Error(`Could't delete the user:${err}`);

    //     }finally{

    //         conn.release()
    //     }


}

