import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import mythical_weapon_routes from './handlers/mythical_weapons'

export const app = express()
app.use(bodyParser.json())

app.get('/status', (request: Request, response: Response) => {
      response.status(200).end('<h1>hello</h1>')
})
app.use('/',mythical_weapon_routes)

app.listen(3000, () => {
      console.log('\n listening to http://localhost:' + 3000)
})