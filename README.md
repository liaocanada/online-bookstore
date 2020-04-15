# Online Bookstore
An elaborate online bookstore. Built by David Liao and Eric Pham. 
(Work in progress!)

## Features
(When complete,) **Users are able to:**
 - Search for books
 - Add to cart
 - Sign in
 - Place order
 - Track status
 
**Owners are able to:**
 - Add/remove/edit books
 - Add/remove/edit publishers
 - View sales statistics and KPIs
 
**Publishers are able to:**
 - Receive some amount of commission for his/her published books
 - Receive an email when stock drops below some amount
 
## Tech Stack
### Application
 - React app
 - Next.js

### Deployment (AWS)
 - S3 or EC2: frontend
 - API Gateway/Lambda: serverless backend
 - RDS for PostgreSQL w/ Read Replica: database
 - CloudFront: CDN for faster loading
 - ElastiCache Redis: server-side session cache for shopping carts
 - WAF: prevent DDoS
 - SQS between API Gateway and Lambda: request buffer
 - Cognito: user authentication
 - SNS: emailing publishers for reorder

## Database Design
See README in the [sql](./sql) folder

## Instruction for running
- Clone this repo (or download it)
- Run the following commands in the terminal (when in the directory of the app):
- npm install
- npm run dev