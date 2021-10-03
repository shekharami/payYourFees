const User = require('../models/users');
const utils = require('../utils/utils');

module.exports = {
  createUser: async (model, transaction = null) => {
    utils.areRequiredFieldsPresent({ ...model });
    return User.create(model);
  }
};
