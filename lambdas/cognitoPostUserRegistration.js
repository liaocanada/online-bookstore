// This lambda is triggered after a user signs up on Cognito and
//     invokes the createUserAndCart lambda

const AWS = require('aws-sdk');

// const invokeCreateUser = async event => {
//   const lambda = new AWS.Lambda();

//   const { userName: username } = event;
//   const { email } = event.request.userAttributes;

//   const invokeParams = {
//     FunctionName: 'createUserAndCart',
//     InvocationType: 'Event',
//     Payload: { body: { username, email } }  // Simulate an HTTP request coming from API Gateway, Payload = event
//   };
//   lambda.invoke(invokeParams, (err, data) => {});
//   return event;
// };

exports.handler = async event => {
  console.log(event);

  // return invokeCreateUser(event);

  const lambda = new AWS.Lambda();

  const { userName: username } = event;
  const { email } = event.request.userAttributes;

  // Simulate an HTTP request coming from API Gateway, Payload = event
  const invokeParams = {
    FunctionName: 'createUserAndCart',
    InvocationType: 'Event',
    Payload: JSON.stringify({ body: JSON.stringify({ username, email }) })
  };
  return new Promise((resolve, reject) => {
    lambda.invoke(invokeParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log('Data: ', data);
        resolve(event);
      }
    });
  });

  // if (email) {
    // sendEmail(event.request.userAttributes.email, `Congratulations ${event.userName}, you have been confirmed: `);
  // }
};

// function sendEmail(to, body, completedCallback) {
//   var ses = new aws.SES();
//   var eParams = {
//     Destination: {
//       ToAddresses: [to]
//     },
//     Message: {
//       Body: {
//         Text: {
//           Data: body
//         }
//       },
//       Subject: {
//         Data: "Cognito Identity Provider registration completed"
//       }
//     },

//     // Replace source_email with your SES validated email address
//     Source: "<source_email>"
//   };

//   var email = ses.sendEmail(eParams, function (err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("===EMAIL SENT===");
//     }
//     completedCallback('Email sent');
//   });
//   console.log("EMAIL CODE END");
// };
