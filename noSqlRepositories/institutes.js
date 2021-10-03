const Institute = require('../models/users');
const utils = require('../utils/utils');

module.exports = {
  createInstitute: async (model, transaction = null) => {
    utils.areRequiredFieldsPresent({ ...model });
    return Institute.create(model);
  }
};
