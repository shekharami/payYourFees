const mongoose = require('mongoose');
const Institute = require('./institutes');

const feeSchema = new mongoose.Schema(
  {
    institute: {
      type: mongoose.Types.ObjectId,
      ref: Institute
    },

    name: {
      type: String,
      required: [true, 'Must have a name']
    },

    numeralWeight: {
      // 1 - 12 for months, other numbers for different fees
      type: Number
    },

    desc: {
      type: String
    },

    amount: {
      type: Number,
      required: [true]
    },

    classes: {
      type: [String]
    },

    programme: {
      type: [String]
    },

    course: {
      type: [String]
    },

    active: {
      type: Boolean,
      default: true
    },

    payBy: {
      type: Date
    },

    updatedAt: {
      type: Date
    },

    addedAt: {
      type: Date,
      default: Date.now()
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Fees = mongoose.model('Fees', feeSchema);

module.exports = Fees;
