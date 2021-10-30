const User = require('../models/users');
const Student = require('../models/students');
const Cart = require('../models/cart');
const utils = require('../utils/utils');

module.exports = {
  getStudents: async ({ whereQuery, fields = [], instituteFields = [] }) => {
    let query = Student.find(whereQuery);
    let selectQuery = null;
    if (fields.length) {
      selectQuery = fields.join(' ');
      query = query.select(selectQuery);
    }
    if (fields.includes('institute')) {
      query = query.populate(
        'institute',
        instituteFields.length ? instituteFields.join(' ') : null
      );
    }
    return query;
  }
};
