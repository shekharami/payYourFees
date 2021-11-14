const Cart = require('../models/cart');
const utils = require('../utils/utils');
const mongoose = require('mongoose');

const convertToMongoObj = (key) => (typeof key === 'string' ? mongoose.Types.ObjectId(key) : key);

module.exports = {
  createUser: async (model, transaction = null) => {
    utils.areRequiredFieldsPresent({ ...model });
    return User.create(model);
  },

  getCart: ({ user, student = null, institute = null, findOne = false, findAll = false }) => {
    const whereQuery = {};
    if (user) {
      whereQuery.user = convertToMongoObj(user);
    }
    if (student) {
      whereQuery.student = convertToMongoObj(student);
    }
    if (institute) {
      whereQuery.institute = convertToMongoObj(institute);
    }
    if (findOne) {
      return Cart.findOne(whereQuery);
    }
    if (findAll) {
      return Cart.find(whereQuery)
        .populate('lastFee', 'priority')
        .populate('institute', 'name')
        .populate('student', 'name class');
    }
    return Cart.countDocuments(whereQuery);
  },

  addToCart: (model) => {
    return Cart.create(model);
  },
  removeFromCart: ({ whereQuery }) => Cart.deleteMany(whereQuery)
};
