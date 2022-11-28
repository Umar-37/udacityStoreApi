## Set up

- `npm i` to install dependencies
- `docker-compose up -d` to start docker in the background
- `npm run upDev` to set up the development database
- `npm run build` to build the app

## Start the app
- `npm run start` to start the app


## Test the app

- `npm run test` to run create the testing database and run all tests

## Routes 

#### Users
- Create `/users/create` [POST] 
- Auth `/users/auth` [POST] 
- Index `/users` [GET] 
- Show `/users/:id` [GET] 

#### Products
- Create `/products/create` [POST] 
- Index `/products` [GET]
- Show `/products/:id` [GET]

#### Orders
- Create `/orders/create` [POST] 
- Index `/orders` [GET] 
- Show `/orders/:id` [GET] 
