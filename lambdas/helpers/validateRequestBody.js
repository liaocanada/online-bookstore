/** Checks to make sure all expected keys are truthy. */
const validateRequestBody = (body, expectedKeys) => {
    if (!body) return false;

    const hasUndefinedValue = expectedKeys.some(key => !body[key]);
    return !hasUndefinedValue;
};

module.exports = validateRequestBody;