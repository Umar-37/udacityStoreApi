import jwt, {Secret} from "jsonwebtoken"
import {User} from "../models/user"
import {NextFunction, Request, Response} from "express"

const SECRET = process.env.TOKEN_SECRET as Secret

export function getToken (user: User):string {
  
  return jwt.sign(user, SECRET)
}

export function checkAuth (req: Request, res: Response, next: NextFunction): void | boolean {
  
  if (!req.headers.authorization) {
    res.status(401).json("Can't Access, wrong token")

    return false
  }

  try {
    jwt.verify(req.headers.authorization.split(" ")[1], SECRET)

    next()
  } catch (err) {
    console.error(err)

    res.status(401).json("Can't Access, wrong token")
    return false
  }
}
