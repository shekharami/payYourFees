const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const instituteSchema = new mongoose.Schema(
  {
    instituteType: {
      type: String,
      enum: ['school', 'coaching', 'college']
    },

    name: {
      type: String,
      required: [true, 'You should provide your name']
    },

    email: {
      type: String,
      unique: true,
      required: [true, 'you must provide an email']
    },

    phone: {
      type: [String]
    },

    address: {
      type: String
    },

    addressDistrict: {
      type: String
    },

    addressPinCode: {
      type: Number
    },

    addressState: {
      type: String
    },

    class: {
      type: [String]
    },

    programme: {
      type: [String]
    },

    course: {
      type: [String]
    },

    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: 5,
      select: false
    },

    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        //This only works on CREATE OR SAVE!
        validator: function (val) {
          return val === this.password;
        }
      },
      message: 'You typed something different than above.'
    },

    gst: {
      type: String
    },

    pan: {
      type: String
    },

    addedAt: {
      type: Date,
      default: Date.now()
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

instituteSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);

  this.confirmPassword = undefined;
  next();
});

instituteSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Institute = mongoose.model('Institute', instituteSchema);

module.exports = Institute;
