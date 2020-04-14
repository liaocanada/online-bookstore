# Lambdas
This folder contains all the lambda functions which are deployed to AWS Lambda. The purpose of them is to access the RDS database and return a response to be served by API Gateway.

## API Endpoints
API url is currently at `https://qyoxm4iv68.execute-api.us-east-1.amazonaws.com/`

### Products
| Method | Endpoint                   | Lambda Function      | Inputs  |
| ------ | -------------------------- | -------------------- | ------- |
| GET    | /products                  | getAllProducts       | (Query) |
| GET    | /products/{product_id}     | getProductById       | Params  |
<!-- | POST   | /products                  | createProduct        | Request body | -->

### Users
| Method | Endpoint                   | Function             | Inputs  |
| ------ | -------------------------- | -------------------- | ------- |
| GET    | /users/{username}          | getUser    | Params  |
| POST   | /users                     | createUserAndCart    | Request body |
<!-- | DELETE | /users/{username} | TODO | TODO | -->

### Cart/Products
| Method | Endpoint                   | Function             | Inputs  |
| ------ | -------------------------- | -------------------- | ------- |
| GET    | /cart/{username}           | getCartByUsername    | Params  |
| POST   | /cart/{username}           | addProductToCart     | Request body + Params |
| PUT    | /cart/{username}/{product_id} | editProductInCart | Request body + Params |
| DELETE | /cart/{username}/{product_id} | removeProductFromCart | Params |
| DELETE | /cart/{username} | clearCart | Params |

### Orders
| Method | Endpoint                   | Function             | Inputs  |
| ------ | -------------------------- | -------------------- | ------- |
| GET    | /orders/{order_number}     | getOrder    | Params  |
| POST   | /orders                    | submitOrder     | Request body |

### Authors
| Method | Endpoint                   | Function             | Inputs  |
| ------ | -------------------------- | -------------------- | ------- |
| GET    | /authors/{author_name}     | getAuthor    | Params  |

## Running locally
1. Make a copy of the .envsample file
2. Rename it .env
3. Change the DB_USER and DB_PASSWORD to the actual username/password used to access the database
4. `cd ./lambdas`
5. `node runner.js myLambda.js`, replacing myLambda.js with the file name of the lambda you want to run.

## Deploying
1. Run `deploy-zip.bat` to generate a zip file
2. Upload the index.zip to AWS Lambda
3. Add Lambda Layer
4. Run `deploy-env.bat` to update environment variables
5. Connect integration on API Gateway

## Redeploying
1. Run `deploy-existing.bat`
