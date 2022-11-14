import { response } from "express";
import client from "../database";
import bcrypt from "bcrypt"

export type User = {
    id?: number;
    username: String;
    password: String;
    firstname: String;
    lastname: String;
}
const pepper:string=process.env.BCRYPT_PASSWORD as string
const saltRounds:string=process.env.SALT_ROUNDS as string


export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Error happen while fetching users :${err}`);

        }
    }
    async show(id: string): Promise<User> {
        try {
            const conn = await client.connect()
            const sql = `SELECT * FROM users WHERE id=${id}`
            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(` user does't exist :${err}`);

        }
    }
    async create(user: User) {
            console.log("in create", user);
            const conn = await client.connect()
            const sql = 'INSERT INTO users(firstname, lastname, username,password) VALUES ($1, $2, $3,$4) RETURNING *'
            
            const hash=bcrypt.hashSync(user.password +pepper,parseInt(saltRounds))

        try {
            // const sql = `INSERT INTO mythical_eapons(name, type, weight) VALUES ('omar', 'water',99 );`
            //const sql = `INSERT INTO mythical_weapons(name, type, weight) VALUES (${weapon.name}, ${weapon.type}, ${weapon.weight});`
            //const result = await conn.query(sql)

        let result =  await conn.query(sql, [user.firstname,user.lastname,user.username,hash]
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
            throw new Error(`Cloud't create the user :${err}`);

        }
    }
    async remove(id: string): Promise<User> {
            const conn = await client.connect()
        try {
            const deleted =this.show(id)
            const conn = await client.connect()
            const sql = `DELETE FROM users WHERE id=${id}`
            const result = await conn.query(sql)
            console.log('result is :',result);
            
            //return result.rows
            return deleted 
        } catch (err) {
            throw new Error(`Could't delete the user:${err}`);

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