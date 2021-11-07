const User = require('../models/users');
const Student = require('../models/students');
const Cart = require('../models/cart');
const Payment = require('../models/payments');
const Fees = require('../models/fees');
const utils = require('../utils/utils');

module.exports = {
  getPayment: async ({ whereQuery = {}, limit = 0, fields = [], feeFields = [] }) => {
    let selectQuery = null;
    let query = Payment.findOne(whereQuery, { sort: { paidOn: -1 } });
    if (fields.length) {
      selectQuery = fields.join(' ');
      query = query.select(selectQuery);
    }
    if (fields.includes('fee')) {
      query = query.populate('fee', feeFields.length ? feeFields.join(' ') : null);
    }
    // if (limit) {
    //   query = query.limit(limit);
    // }60acd2645b1c3916c4fdeea2
    return query;
  }
};
