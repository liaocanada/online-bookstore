const configDefaults = {
  API_GATEWAY_ENDPOINT: 'https://qyoxm4iv68.execute-api.us-east-1.amazonaws.com',
  TAX_RATIO: 0.13,
  BOOK_PLACEHOLDER_IMAGE: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWcKnEBkzIjaZL1W1U6t8essNmhTcyZFJQdDK_MtiPPmIX1GOM&usqp=CAU',
  LOGIN_URL: process.env.NODE_ENV === 'development' ?
    'https://davidliaobookstore.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=3gv2ehl5eo84cijqql7sgquoc4&redirect_uri=http://localhost:3000/callback' :
    'https://davidliaobookstore.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=3gv2ehl5eo84cijqql7sgquoc4&redirect_uri=https://ebookstore.davidliao.ca/callback',
  LOGOUT_URL: process.env.NODE_ENV === 'development' ?
    'https://davidliaobookstore.auth.us-east-1.amazoncognito.com/logout?client_id=3gv2ehl5eo84cijqql7sgquoc4&logout_uri=http://localhost:3000/?message=logout_success' :
    'https://davidliaobookstore.auth.us-east-1.amazoncognito.com/logout?client_id=3gv2ehl5eo84cijqql7sgquoc4&logout_uri=https://ebookstore.davidliao.ca/?message=logout_success',
};

const config = {};

// Check each environment variable and override if it exists
Object.keys(configDefaults).forEach(configKey => {
  const envOverride = process.env[configKey];
  config[configKey] = envOverride || configDefaults[configKey];
});

export default config;
