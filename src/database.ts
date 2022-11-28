import dotenv from 'dotenv'
import {Pool} from 'pg'


let client:any;

dotenv.config()
const {
 POSTGRES_HOST,
 POSTGRES_DB,
 POSTGRES_USER,
 POSTGRES_PASSWORD,
ENV
} = process.env


if(ENV === 'test'){
 client= new Pool({
    host:POSTGRES_HOST,
    database:'test',
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
})
}

if(ENV === 'dev'){
 client= new Pool({
    host:POSTGRES_HOST,
    database:POSTGRES_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
})
}
console.log('the env is :',ENV);

// const query="INSERT INTO public.users(name, phone_number) VALUES ( 'mohaned', '0534569493');"
// const getUsers = () => {
//     client.query('SELECT * FROM users ', (error:any, results:any) => {
//     //client.query(query, (error:any, results:any) => {
//       if (error) {
//         throw error
//       }
//       results.rows.forEach((e:object) => {
//       console.log(e);
//       });
//       console.log(results);
      
      
      
//     })
//   }
//   getUsers()
export default client
