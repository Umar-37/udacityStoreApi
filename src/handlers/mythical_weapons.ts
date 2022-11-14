import express, { Request, Response } from 'express'
import { Weapon,MythicalWeaponStore } from '../models/mythical_weapon'
const mythical_weapon_routes=express()

const store =new MythicalWeaponStore()

const index=async (_req:Request,res:Response)=>{
      const weapons=await store.index()
      console.log('in the index');
      res.json(weapons)
      
}
const show=async (req:Request,res:Response)=>{
      const weapon=await store.show(req.params.id)
      console.log('in the show');
      res.json(weapon)
      
}
const create=async (req:Request,res:Response)=>{
      try{
            console.log('\ntriggerd');
            
      const weapon:Weapon={
            name:req.body.name,
            type:req.body.type,
            weight:req.body.weight,
            //since the id is autoincrement we dont need it right now
            //id:req.body.id
      }
      
      
      const newWeapon=await store.create(weapon)
      console.log('is:',req.body);
      res.json(newWeapon)

      }catch(err){
            res.status(400)
            res.json(err)
      }
      
}
const remove=async (req:Request,res:Response)=>{
      try{
            console.log('\nin remove');
      
      const deleteWeapon=await store.remove(req.params.id)
      console.log('the deleling weapon is:',deleteWeapon);
      
      res.json(deleteWeapon)

      }catch(err){
            res.status(400)
            res.json(err)
      }
      
}
mythical_weapon_routes.get('/products',index)
mythical_weapon_routes.get('/products/:id',show)
mythical_weapon_routes.post('/make',create)
mythical_weapon_routes.put('/remove/:id',remove)
//mythical_weapon_routes.delete('/remove/:id',remove)

export default mythical_weapon_routes;
