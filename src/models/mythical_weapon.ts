import { response } from "express";
import client from "../database";
import bcrypt from "bcrypt"

export type Weapon = {
    id?: number;
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

            return result.rows
        } catch (err) {
            throw new Error(`error happen :${err}`);

        }
    }
    async show(id: string): Promise<Weapon> {
        try {
            const conn = await client.connect()
            const sql = `SELECT * FROM mythical_weapons WHERE id=${id}`
            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`error happen :${err}`);

        }
    }
    async create(weapon: Weapon) {
            console.log("in create", weapon);
            const conn = await client.connect()
            const sql = 'INSERT INTO mythical_weapons(name, type, weight) VALUES ($1, $2, $3) RETURNING *'
            const pepper:string=process.env.BCRYPT_PASSWORD as string
            const saltRounds:string=process.env.SALT_ROUNDS as string
            const hash=bcrypt.hashSync(weapon.name +pepper,parseInt(saltRounds))

        try {
            // const sql = `INSERT INTO mythical_eapons(name, type, weight) VALUES ('omar', 'water',99 );`
            //const sql = `INSERT INTO mythical_weapons(name, type, weight) VALUES (${weapon.name}, ${weapon.type}, ${weapon.weight});`
            //const result = await conn.query(sql)

        let result =  await conn.query(sql, [hash, weapon.type, weapon.weight]
           //debug this
        //     ,(err:any,res:any)=>{
        //     if(err) console.log('Error happen:',err);

        //     return res;
            
        // }
        )
            //console.log('reult is:', result);

            conn.release()
            return result.rows

        } catch (err) {
            throw new Error(`error happen :${err}`);

        }
    }
    async remove(id: string): Promise<Weapon> {
            const conn = await client.connect()
        try {
            const deleted =this.show(id)
            const conn = await client.connect()
            const sql = `DELETE FROM mythical_weapons WHERE id=${id}`
            const result = await conn.query(sql)
            console.log('result is :',result);
            
            //return result.rows
            return deleted 
        } catch (err) {
            throw new Error(`error happen :${err}`);

        }finally{

            conn.release()
        }
    }


}

// async function name() {
// let s=new MythicalWeaponStore()
// let ss=s.show(2)
//    console.log(await  ss) 
// }
//name()