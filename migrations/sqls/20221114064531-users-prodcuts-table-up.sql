/* Replace with your SQL commands */
/* Replace with your SQL commands */

CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  username        VARCHAR(150) NOT NULL,
  firstname       VARCHAR(150) NOT NULL,
  lastname        VARCHAR(150) NOT NULL,
  password       VARCHAR(150) NOT NULL
);

CREATE TABLE products (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(150) NOT NULL,
  price INTEGER      NOT NULL
);
CREATE TABLE orders (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  status  BOOLEAN NOT NULL
);
CREATE TABLE order_products (
  order_id   INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES products (id),
  quantity   INTEGER NOT NULL
);
INSERT INTO users 
VALUES (1,'hisaoa00','omar', 'alhussan','Omar.sdfsdk' )
, (2,'xob_ksa','kaled', 'alqhtani','kaled.sdfsdk' );