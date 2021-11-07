const mongoose = require('mongoose');
const { Schema } = mongoose;
const Fees = require('./fees');
const Student = require('./students');
const Institute = require('./institutes');
// const User = require('./users');

const paymentSchema = new Schema(
  {
    fee: {
      type: mongoose.Types.ObjectId,
      ref: Fees
    },

    student: {
      type: mongoose.Types.ObjectId,
      ref: Student
    },

    institute: {
      type: mongoose.Types.ObjectId,
      ref: Institute
    },

    paymentMode: {
      type: String,
      enum: {
        values: ['online', 'offline']
      }
    },

    comments: {
      type: String
    },

    paidOn: {
      type: Date,
      default: Date.now()
    },

    // paidBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: User
    // },

    amount: {
      type: Number
    },

    razorpay: {
      type: mongoose.Types.ObjectId //,
      // ref : Razorpay
    },

    addedAt: {
      type: Date,
      default: Date.now()
    },

    deletedAt: {
      type: Date,
      default: null
    },

    updatedAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Payments = mongoose.model('Payments', paymentSchema);

module.exports = Payments;
