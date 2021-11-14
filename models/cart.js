const mongoose = require('mongoose');
const User = require('./users');
const Student = require('./students');
const Fee = require('./fees');
const Institute = require('./institutes');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: User
    },

    student: {
      type: mongoose.Types.ObjectId,
      ref: Student,
      required: true
    },

    institute: {
      type: mongoose.Types.ObjectId,
      ref: Institute,
      required: true
    },

    lastFee: {
      type: mongoose.Types.ObjectId,
      ref: Fee
    },

    createdAt: {
      type: Date,
      default: new Date(),
      select: false
    },

    updatedAt: {
      type: Date,
      default: new Date(),
      select: false
    },

    deletedAt: {
      type: Date,
      default: null,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
