import { convertToObject } from "typescript";
import client from "../database";

export type Weapon = {
    id: Number;
    name: String;
    type: String;
    weight: Number
}

export class MythicalWeaponStore {
    async index(): Promise<Weapon[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM mythical_weapons'
            const result = await conn.query(sql)
            conn.release()

            return  result.rows
        } catch (err) {
            throw new Error(`error happen :${err}`);

        }
    }
    async show(id:number): Promise<Weapon[]> {
        try {
            const conn = await client.connect()
            const sql = `SELECT * FROM mythical_weapons WHERE id=${id}`
            const result = await conn.query(sql)
            conn.release()

            return  result.rows
        } catch (err) {
            throw new Error(`error happen :${err}`);

        }
    }


}

async function name() {
let s=new MythicalWeaponStore()
let ss=s.show(2)
   console.log(await  ss) 
}
name()