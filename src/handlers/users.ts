import express, { Request, Response } from 'express'
import { User,UserStore } from '../models/user'
const user_routes=express()

const store =new UserStore()

const index=async (_req:Request,res:Response)=>{
      const users=await store.index()
      console.log('in the index');
      res.json(users)
      
}
const show=async (req:Request,res:Response)=>{
      const user=await store.show(req.params.id)
      console.log('in the show');
      res.json(user)
      
}
const create=async (req:Request,res:Response)=>{
      try{
            console.log('\ntriggerd');
            
      const user:User={
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            password:req.body.password,
            //since the id is autoincrement we dont need it right now
            //id:req.body.id
      }
      if (user.firstname === undefined || user.lastname === undefined || user.username === undefined || user.password === undefined) {
            res.status(400)
            res.send("filds are't fill field")
            return false
          }

      
      
      const newUser=await store.create(user)
      console.log('is:',req.body);
      res.json(newUser)

      }catch(err){
            res.status(400)
            res.json(err)
      }
      
}
const remove=async (req:Request,res:Response)=>{
      try{
            console.log('\nin remove');
      
      const deleteUser=await store.remove(req.params.id)
      console.log('the deleling weapon is:',deleteUser);
      
      res.json(deleteUser)

      }catch(err){
            res.status(400)
            res.json(err)
      }
      
}
user_routes.get('/products',index)
user_routes.get('/products/:id',show)
user_routes.post('/make',create)
user_routes.delete('/remove/:id',remove)
//mythical_weapon_routes.delete('/remove/:id',remove)

export default user_routes;
