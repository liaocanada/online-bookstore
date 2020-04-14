/** Checks to make sure all expected keys are defined. */
const validateRequestBody = (body, expectedKeys) => {
    if (!body) return false;

    const hasUndefinedValue = expectedKeys.some(key => !(body[key] || body[key] === 0));
    return !hasUndefinedValue;
};

module.exports = validateRequestBody;