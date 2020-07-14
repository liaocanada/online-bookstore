const configDefaults = {
    API_GATEWAY_ENDPOINT: "https://qyoxm4iv68.execute-api.us-east-1.amazonaws.com",
    TAX_RATIO: 0.13,
    BOOK_PLACEHOLDER_IMAGE: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWcKnEBkzIjaZL1W1U6t8essNmhTcyZFJQdDK_MtiPPmIX1GOM&usqp=CAU"
};

const config = {};

// Check each environment variable and override if it exists
Object.keys(configDefaults).forEach(configKey => {
    const envOverride = process.env[configKey];
    config[configKey] = envOverride || configDefaults[configKey];
});

export default config;
