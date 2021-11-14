const Institute = require('../models/users');
const Fee = require('../models/fees');
const utils = require('../utils/utils');

module.exports = {
  createInstitute: async (model, transaction = null) => {
    utils.areRequiredFieldsPresent({ ...model });
    return Institute.create(model);
  },
  getFee: async ({ whereQuery, feeAttributes = ['name', 'desc', 'amount', 'payBy'] }) => {
    return Fee.find(whereQuery).select(feeAttributes.join(' '));
  }
};
