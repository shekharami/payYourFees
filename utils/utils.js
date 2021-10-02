module.exports = {
  createErrorObject: function ({ status, error, message }) {
    const err = new Error();
    err.status = status;
    err.error = error;
    err.message = message;
    return err;
  },
  areRequiredFieldsPresent: function (...args) {
    const params = args[0];
    const missingKeys = [];
    for (const key in params) {
      if (!(params[key] || params[key] === 0)) {
        missingKeys.push(key);
      }
    }
    if (missingKeys.length) {
      throw this.createErrorObject({
        status: 400,
        message: `Param '${missingKeys.join()}' ${missingKeys.length === 1 ? 'is' : 'are'} required`
      });
    }
    return true;
  }
};
