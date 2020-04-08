# SQL DDLs
## Design
### Entity-Relationship Diagram
![ER diagram for the database behind this app](./images/erDiagram.png)

### Schema Diagram
![Schema diagram for the database behind this app](./images/schemaDiagram.png)

## Order
Since there are foreign key constraints, the files should be run in the following order:
1. product
2. author/book/warehouse
3. writes/stored_in/product_image/product_tag
