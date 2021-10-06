const mongoose = require('mongoose');
const User = require('./users');
const Student = require('./students');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: User
    },

    students: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: Student
    },

    addedAt: {
      type: Date,
      default: new Date(),
      select: false
    },

    updatedAt: {
      type: Date,
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
