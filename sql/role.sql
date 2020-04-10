CREATE TABLE role(role_id SERIAL PRIMARY KEY, name VARCHAR(25), description VARCHAR(2047));
INSERT INTO role(role_id, name, description) VALUES (1, 'CUSTOMER', 'A registered customer.');
INSERT INTO role(role_id, name, description) VALUES (2, 'ADMIN', 'An administrator who is able to perform CRUD operations on all books in the store.');
