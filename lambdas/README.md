# Lambdas
This folder contains all the lambda functions which are deployed to AWS Lambda. The purpose of them is to access the RDS database and return a response to be served by API Gateway.

## API Endpoints
### Products
| Method | Endpoint                   | Lambda Function      |
| ------ | -------------------------- | -------------------- |
| GET | /products | getAllProducts |
| GET | /products/${productId} | getProductById   |
| POST | /products | createProduct |

### Users
Work in progress

### Carts
| Method | Endpoint                   | Function             |
| ------ | -------------------------- | -------------------- |
| GET    | /cart/${username}          | getCartByUsername    |
| TODO   | TODO                       | TODO                 |

### Orders
Work in progress

## Running locally
1. Make a copy of the .envsample file
2. Rename it .env
3. Change the DB_USER and DB_PASSWORD to the actual username/password used to access the database
4. `cd ./lambdas`
5. `node runner.js myLambda.js`, replacing myLambda.js with the file name of the lambda you want to run.
