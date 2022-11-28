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
- Auth `/users/auth` [POST] [token required]
- Index `/users` [GET] [token required]
- Show `/users/:id` [GET] [token required]

#### Products
- Create `/products/create` [POST] [token required]
- Index `/products` [GET]
- Show `/products/:id` [GET]

#### Orders
- Create `/orders/create` [POST] [token required]
- Index `/orders` [GET] 
- Show `/orders/:id` [GET] [token required]
