import express, { Request, Response } from 'express'
import { UserStore, User } from '../models/user'
const user_routes = express()

const store = new UserStore()
const checkNan = (num: unknown): boolean => isNaN(num as number) || num as number <= 0 || num as number <= 0

const index = async (_req: Request, res: Response) => {
      try {
            const users = await store.index()
            res.json(users)
      } catch (err) {
            res.status(400).json(err)

      }


}
const show = async (req: Request, res: Response) => {
      try {
            if (checkNan(req.params.id)) {
                  res.status(400).json('only positve numbers are allowd')
                  return;
            }
            const user = await store.show(req.params.id)
            res.json(user)
      }
      catch (err) {
            console.log(err);
            res.status(400)
                  .json(err)

      }
}
const create = async (req: Request, res: Response) => {
      try {

            const user: User = {
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  username: req.body.username,
                  password: req.body.password,
                  //since the id is autoincrement we dont need it right now
                  //id:req.body.id
            }

            let property: keyof User;
            for (property in user) {
                  //check if the filds are not empty
                  if (user[property] == undefined || user[property]?.toString().trim() == "") {
                        res.status(400).json("filds are't fill field, or some of it are empty")
                        return false;
                  }
            }
            const newUser = await store.create(user)
            res.json(newUser)

      } catch (err) {
            console.log(err);
            res.status(400)
                  .json(err)
      }

}


user_routes.get('/users', index)
user_routes.get('/users/:id', show)
user_routes.post('/users/create', create)
//mythical_weapon_routes.delete('/remove/:id',remove)

export default user_routes;
