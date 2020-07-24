const connect = require('./helpers/connectToDatabase');
const formTextResponse = require('./helpers/formTextResponse');
const formJsonResponse = require('./helpers/formJsonResponse');
const validateRequestBody = require('./helpers/validateRequestBody');
const formatToTimestamp = require('./helpers/formatToTimestamp');

// TODO make this transactional

exports.handler = async event => {
  console.log(event);
    // TODO validate data types of each
  const requestBody = JSON.parse(event.body);
  const expectedKeys = ['username', 'email'];

  if (!validateRequestBody(requestBody, expectedKeys)) {
    return formTextResponse(400,
      `Missing request body attributes: one of ${expectedKeys.toString()}`);
  }

  const { username, email } = requestBody;
  const time_created = new Date();
  const time_last_login = new Date();

  const client = await connect();

    // add user
    // TODO add error handling for duplicate usernames
  let statement = 'insert into storeuser (username, email, time_created, time_last_login) ' +
        'values (:username, :email, :time_created, :time_last_login);';
    // let values = { username, first_name, last_name, email, address,
    //     picture, time_created, time_last_login };
    // let res = await client.query(statement, values);

    // Can't use lines above because data-api-client does not support Date types
    // Workaround is to use native methods directly, passing the TIMESTAMP typehint
    // Waiting on https://github.com/jeremydaly/data-api-client/issues/28
  let res = await client.executeStatement({
    sql: statement,
    parameters: [
      {
        name: 'username',
        value: { stringValue: username }
      },
      {
        name: 'email',
        value: { stringValue: email }
      },
      {
        name: 'time_created',
        value: { stringValue: formatToTimestamp(time_created, false) },
        typeHint: 'TIMESTAMP'
      },
      {
        name: 'time_last_login',
        value: { stringValue: formatToTimestamp(time_last_login, false) },
        typeHint: 'TIMESTAMP'
      }
    ]
  });

    // create user cart
  statement = 'insert into cart (username, last_edited) values (:username, :time_created);';
    // values = { username, time_created };
    // res = await client.query(statement, values);

    // Can't use lines above because data-api-client does not support Date types
    // Workaround is to use native methods directly, passing the TIMESTAMP typehint
    // Waiting on https://github.com/jeremydaly/data-api-client/issues/28
  res = await client.executeStatement({
    sql: statement,
    parameters: [
      {
        name: 'username',
        value: { stringValue: username }
      },
      {
        name: 'time_created',
        value: { stringValue: formatToTimestamp(time_created, false) },
        typeHint: 'TIMESTAMP'
      }
    ]
  });

  // Give user the role of customer (role ID: 1)
  statement = 'insert into user_role (username, role_id) values (:username, :role_id);';
  const values = { username, role_id: 1 }; // 1 is role id for customer
  res = await client.query(statement, values);

  return formJsonResponse(201, { username });
};
