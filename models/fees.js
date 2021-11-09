const mongoose = require('mongoose');
const Institute = require('./institutes');
const config = require('config');

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

    priority: {
      // fees to be collected in a particular month hsould have same priority
      type: Number,
      enum: Object.values(config.get('priority')),
      required: true
    },

    tag: {
      type: String,
      enum: Object.values(config.get('fees.tags')),
      // TUTION_FEES FOR month's tution fee,
      // OTHER for any other fees,
      // FINE for any late fee/ different fine
      required: true
    },

    desc: {
      //description of fees
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
