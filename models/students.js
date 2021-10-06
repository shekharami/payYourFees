const mongoose = require('mongoose');
const Institute = require('./institutes');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'You should provide your name']
    },

    gender: {
      type: String,
      enum: ['M', 'F', 'O']
    },

    father: {
      type: String
    },

    mother: {
      type: String
    },

    email: {
      type: String
    },

    phone: {
      type: String
    },

    address: {
      type: String
    },

    institute: {
      type: mongoose.Types.ObjectId,
      ref: Institute
    },

    rollNo: {
      type: String
    },

    registrationNo: {
      type: String
    },

    class: {
      type: String
    },

    section: {
      type: String
    },

    programme: {
      type: String
    },

    course: {
      type: String
    },

    feesPaidTill: {
      type: Date
    },

    lastPaymentMadeOn: {
      type: Date
    },

    active: {
      type: Boolean,
      default: true
    },

    addedAt: {
      type: Date,
      default: Date.now(),
      select: false
    },

    updatedAt: {
      type: Date
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

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
