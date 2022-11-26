import express, { Request, Response } from 'express'
import { UserStore, User } from '../models/user'
import { checkAuth, getToken } from "./auther"
const user_routes = express()

const store = new UserStore()
const checkNan = (num: unknown): boolean => isNaN(num as number) || num as number <= 0 || num as number <= 0

const index = async (_req: Request, res: Response) => {
      try {
            const users = await store.index()
            console.log('in the index');
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
            console.log('in the show');
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
            console.log('\ntriggerd');

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
            console.log('is:', req.body);
            res.json(newUser)

      } catch (err) {
            console.log(err);
            res.status(400)
                  .json(err)
      }

}
const remove = async (req: Request, res: Response) => {
      try {
            console.log('\nin remove');

            if (checkNan(req.params.id)) {
                  res.status(400).send('only positve numbers are allowd')
                  return false;
            }

            const deleteUser = await store.remove(req.params.id)
            console.log('the deleling weapon is:', deleteUser);

            res.json(deleteUser)

      } catch (err) {
            res.status(400)
            res.json(err)
      }

}
const authenticate = async (req: Request, res: Response):Promise<false|unknown> => {
      try {

            const userAuth: User = {
                  username: req.body.username as unknown as string,
                  password: req.body.password as unknown as string,
            };

                  let property: keyof User;
                  for (property in userAuth) {
                  //check if the filds are not empty
                  if (userAuth[property] == undefined || userAuth[property]?.toString().trim() == "") {
                        res.status(400).json("filds aren't fill field, or some of it are empty")
                        return false;
                  }
            }

            const user: User | null  = await store.authenticate(userAuth.username, userAuth.password)

            if (user === null) {
                  res.status(401)
                  res.json(`password is not for user ${userAuth.username}, or ${userAuth.username} does not exist.`)

                  return false
            }

            res.json(getToken(user))
      } catch (e) {
            res.status(400)
            res.json(e)
      }
}
user_routes.get('/users', checkAuth, index)
user_routes.get('/users/:id', checkAuth, show)
user_routes.post('/users/create', checkAuth, create)
user_routes.post("/users/auth", authenticate)
//user_routes.delete('/users/:id', remove)
//mythical_weapon_routes.delete('/remove/:id',remove)

export default user_routes;
