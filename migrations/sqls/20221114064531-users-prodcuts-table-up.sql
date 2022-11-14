/* Replace with your SQL commands */
/* Replace with your SQL commands */

CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  username        VARCHAR(250) NOT NULL,
  firstname       VARCHAR(250) NOT NULL,
  lastname        VARCHAR(250) NOT NULL,
  password       VARCHAR(250) NOT NULL
);

INSERT INTO users 
VALUES (1,'hisaoa00','omar', 'alhussan','Omar.sdfsdk' )
, (2,'xob_ksa','kaled', 'alqhtani','kaled.sdfsdk' );