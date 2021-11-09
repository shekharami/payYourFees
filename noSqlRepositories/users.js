const User = require('../models/users');
const Cart = require('../models/cart');
const utils = require('../utils/utils');

module.exports = {
  createUser: async (model, transaction = null) => {
    utils.areRequiredFieldsPresent({ ...model });
    return User.create(model);
  },

  getCart: async ({ user }) => {
    return Cart.countDocuments({ user });
  },

  addToCart: async (model) => {
    // return Cart.updateOne(where, model, {
    //   upsert: true,
    //   new: true
    // });
    return Cart.create(model);
  }
};
