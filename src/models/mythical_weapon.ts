import client from "../database";

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
    async show(id: string): Promise<Weapon[]> {
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

        try {
            // const sql = `INSERT INTO mythical_eapons(name, type, weight) VALUES ('omar', 'water',99 );`
            //const sql = `INSERT INTO mythical_weapons(name, type, weight) VALUES (${weapon.name}, ${weapon.type}, ${weapon.weight});`
            //const result = await conn.query(sql)

        let result =  await conn.query(sql, [weapon.name, weapon.type, weapon.weight])
            //console.log('reult is:', result);

            conn.release()
            return result.rows

        } catch (err) {
            throw new Error(`error happen :${err}`);

        }
    }


}

// async function name() {
// let s=new MythicalWeaponStore()
// let ss=s.show(2)
//    console.log(await  ss) 
// }
//name()