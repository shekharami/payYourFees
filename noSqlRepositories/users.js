const User = require('../models/users');
const Cart = require('../models/cart');
const utils = require('../utils/utils');

module.exports = {
  createUser: async (model, transaction = null) => {
    utils.areRequiredFieldsPresent({ ...model });
    return User.create(model);
  },

  getCart: async ({ user, populate = false }) => {
    let query = Cart.findOne({ user }).populate('students');
    if (populate) {
      query = query.populate('students');
    }
    return query;
  },

  addToCart: async (where, model, transaction = null) => {
    return Cart.updateOne(where, model, {
      upsert: true,
      new: true
    });
  }
};
