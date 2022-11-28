import client from "../database";

export type Product = {
    id?: number;
    category?: string;
    price: string;
    name: string;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Error happen while fetching products :${err}`);

        }
    }
    async show(id: string): Promise<Product> {
        try {
            const conn = await client.connect()
            const sql = `SELECT * FROM products WHERE id=${id}`
            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(` product does't exist :${err}`);

        }
    }
    async create(product: Product) {
        const conn = await client.connect()
        const sql = 'INSERT INTO products(price,name) VALUES ($1, $2) RETURNING *'

        try {
            let result = await conn.query(sql, [product.price, product.name]

            )
            conn.release()
            return result.rows

        } catch (err) {
            throw new Error(`Cloud't create the product :${err}`);

        }
    }
    


}