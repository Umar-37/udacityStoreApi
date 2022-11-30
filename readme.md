## Set up

- `npm i` to install dependencies
- `docker-compose up -d` to start docker in the background
- `npm run upDev` to set up the development database
- `npm run build` to build the app

## Start the app
- `npm run start` to start the app


## Test the app

- `npm run test` to run create the testing database and run all tests

## API Endpoints

#### Users
<<<<<<< HEAD
- Create [POST] `/users/create`  
- Auth [POST] `/users/auth`  
- Index [GET] `/users`  
- Show [GET] `/users/:id`  

#### Products
- Create [POST] `/products/create`  
- Index [GET] `/products` 
- Show [GET] `/products/:id` 

#### Orders
- Create [POST] `/orders/create`  
- Index [GET] `/orders`  
- Show [GET] `/orders/:id`  

### Ports
The application runs on port `3000` with database on `5432` and Pgadmin on `5050`.

### Environment variables 
To satisfy Udacity requirements, the following environment variable are needed.
```
ENV=dev
TEST_VAR=testing123
# DB VARIABLES
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=postgres
POSTGRES_USER=root
POSTGRES_PASSWORD=admin
# BCRYPT VARIABLES
BCRYPT_PASSWORD=my-name-is
SALT_ROUNDS=10
# JWT
TOKEN_SECRET=123
```
## Database schema
#### Product
Table: *products*
- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `INTEGER`

#### User
Table: *users*
- id `SERIAL PRIMARY KEY`
- username `VARCHAR`
- firstname `VARCHAR`
- lastname `VARCHAR`
- password `VARCHAR`

#### Orders
Table: *orders*
- id `SERIAL PRIMARY KEY`
- user_id `INTEGER` `REFERENCES users(id)`
- status `BOOLEAN`

Table: *order_products*
- order_id `INTEGER` `REFERENCES orders(id)` 
- product_id `INTEGER` `REFERENCES products(id)`
- quantity `INTEGER`

