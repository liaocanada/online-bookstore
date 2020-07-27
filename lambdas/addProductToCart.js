const connect = require('./helpers/connectToDatabase');
const formJsonResponse = require('./helpers/formJsonResponse');
const formTextResponse = require('./helpers/formTextResponse');
const validateRequestBody = require('./helpers/validateRequestBody');
const updateCart = require('./helpers/updateCart');

const getCurrentProductQuantity = async (username, productId, client) => {
  const statement = 'select quantity from cart_product where username=:username and product_id=:pid;';
  const values = { username, pid: parseInt(productId) };
  console.log(statement, values);

  const res = await client.query(statement, values);

  // If product is not in cart, it should be deleted (and not 0 quantity)
  if (res.records[0] && !res.records[0].quantity) {
    throw new Error('Product exists but quantity is falsy!');
  }

  if (!res.records[0]) return 0;  // Product is not in cart
  return parseInt(res.records[0].quantity);  // Product is in cart
};

exports.handler = async event => {
  const requestBody = JSON.parse(event.body);
  const expectedKeys = ['product_id', 'quantity'];  // TODO make sure quantity is an int between 1 and stock

  if (!validateRequestBody(requestBody, expectedKeys)) {
    return formTextResponse(400,
      `Missing request body attributes: one of ${expectedKeys.toString()}`);
  }

  const { product_id, quantity } = requestBody;
  const { username } = event.pathParameters;

  const client = await connect();

  // update user's cart last_edited
  updateCart(client, username);

  // check if user has product in cart already
  const currentQuantity = getCurrentProductQuantity(username, product_id, client);
  if (currentQuantity === 0) {
    // add product to cart_product
    const statement = 'insert into cart_product (username, product_id, quantity) values (:username, :pid, :qty);';
    const values = { username, pid: parseInt(product_id), qty: parseInt(quantity) };
    console.log(statement, values);

    await client.query(statement, values);
  } else {
    // increment quantity if product exists in cart
    const statement = 'update cart_product set quantity = :qty where username = :username and product_id = :product_id;';
    const values = { qty: currentQuantity + parseInt(quantity), username, product_id };
    console.log(statement, values);

    await client.query(statement, values);
  }

  return formJsonResponse(201, { username, product_id, quantity });
};
